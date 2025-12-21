package services

import (
	"context"
	"errors"
	"transaction-service/models"
	"transaction-service/proto"

	"github.com/google/uuid"
	"github.com/sirupsen/logrus"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"gorm.io/gorm"
)

type TransactionService struct {
	proto.UnimplementedTransactionServiceServer
	db            *gorm.DB
	accountClient proto.AccountServiceClient
}

func NewTransactionService(db *gorm.DB) *TransactionService {
	conn, err := grpc.Dial("account-service:50052", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		logrus.WithError(err).Fatal("Failed to connect to AccountService")
	}

	accountClient := proto.NewAccountServiceClient(conn)

	return &TransactionService{
		db:            db,
		accountClient: accountClient,
	}
}

// CreateTransaction handles transfers between two accounts.
func (s *TransactionService) CreateTransaction(ctx context.Context, req *proto.CreateTransactionRequest) (*proto.CreateTransactionResponse, error) {
	// Fetch sender account by account number
	senderResp, err := s.accountClient.GetAccountByNumber(ctx, &proto.GetAccountByNumberRequest{
		AccountNumber: req.SenderAccountNumber,
	})
	if err != nil || !senderResp.Success || senderResp.Account == nil {
		logrus.WithError(err).Error("Sender account not found")
		return nil, errors.New("sender account not found")
	}
	senderAccount := senderResp.Account

	if senderAccount.Status != proto.AccountStatus_ACTIVE {
		logrus.Error("Sender account is not active")
		return nil, errors.New("sender account is not active")
	}

	// Fetch receiver account by account number
	receiverResp, err := s.accountClient.GetAccountByNumber(ctx, &proto.GetAccountByNumberRequest{
		AccountNumber: req.ReceiverAccountNumber,
	})
	if err != nil || !receiverResp.Success || receiverResp.Account == nil {
		logrus.WithError(err).Error("Receiver account not found")
		return nil, errors.New("receiver account not found")
	}
	receiverAccount := receiverResp.Account

	if receiverAccount.Status != proto.AccountStatus_ACTIVE {
		logrus.Error("Receiver account is not active")
		return nil, errors.New("receiver account is not active")
	}

	// Validate currency match
	if senderAccount.Currency != req.Currency {
		logrus.Error("Sender account currency does not match transaction currency")
		return nil, errors.New("sender account currency does not match transaction currency")
	}
	if receiverAccount.Currency != req.Currency {
		logrus.Error("Receiver account currency does not match transaction currency")
		return nil, errors.New("receiver account currency does not match transaction currency")
	}

	// Validate sufficient balance
	if senderAccount.Balance < req.Amount {
		logrus.Error("Insufficient balance in sender account")
		return nil, errors.New("insufficient balance in sender account")
	}

	// Create transaction with pending status
	txn := &models.Transaction{
		ID:                    uuid.New(),
		SenderID:              uuid.MustParse(senderAccount.UserId),
		SenderAccountID:       uuid.MustParse(senderAccount.Id),
		SenderAccountNumber:   req.SenderAccountNumber,
		ReceiverID:            uuid.MustParse(receiverAccount.UserId),
		ReceiverAccountID:     uuid.MustParse(receiverAccount.Id),
		ReceiverAccountNumber: req.ReceiverAccountNumber,
		Amount:                req.Amount,
		Currency:              req.Currency,
		TransactionStatus:     models.StatusPending,
		Type:                  models.TypeTransfer,
		Note:                  req.Note,
		PaymentCode:           req.PaymentCode,
		Model:                 req.Model,
		CallNumber:            req.CallNumber,
	}

	if err := s.db.Create(txn).Error; err != nil {
		logrus.WithError(err).Error("Failed to create transaction")
		return nil, err
	}

	// Debit sender
	deductResp, err := s.accountClient.UpdateBalance(ctx, &proto.UpdateBalanceRequest{
		AccountId: senderAccount.Id,
		Amount:    -req.Amount,
	})
	if err != nil || !deductResp.Success {
		txn.TransactionStatus = models.StatusDeclined
		s.db.Save(txn)
		logrus.WithError(err).Error("Failed to deduct from sender account")
		return nil, errors.New("failed to deduct from sender account")
	}

	// Credit receiver
	addResp, err := s.accountClient.UpdateBalance(ctx, &proto.UpdateBalanceRequest{
		AccountId: receiverAccount.Id,
		Amount:    req.Amount,
	})
	if err != nil || !addResp.Success {
		// Rollback: refund sender
		s.accountClient.UpdateBalance(ctx, &proto.UpdateBalanceRequest{
			AccountId: senderAccount.Id,
			Amount:    req.Amount,
		})
		txn.TransactionStatus = models.StatusDeclined
		s.db.Save(txn)
		logrus.WithError(err).Error("Failed to add to receiver account")
		return nil, errors.New("failed to add to receiver account")
	}

	txn.TransactionStatus = models.StatusApproved
	if err := s.db.Save(txn).Error; err != nil {
		logrus.WithError(err).Error("Failed to update transaction status to approved")
		return nil, err
	}

	return &proto.CreateTransactionResponse{Transaction: transactionToProto(txn)}, nil
}

// Deposit funds into a single account.
func (s *TransactionService) Deposit(ctx context.Context, req *proto.DepositRequest) (*proto.DepositResponse, error) {
	accountResp, err := s.accountClient.GetAccountByNumber(ctx, &proto.GetAccountByNumberRequest{AccountNumber: req.AccountNumber})
	if err != nil || !accountResp.Success || accountResp.Account == nil {
		logrus.WithError(err).Error("Account not found for deposit")
		return nil, errors.New("account not found")
	}
	account := accountResp.Account

	if account.Status != proto.AccountStatus_ACTIVE {
		logrus.Error("Account is not active")
		return nil, errors.New("account is not active")
	}
	if account.Currency != req.Currency {
		logrus.Error("Account currency does not match deposit currency")
		return nil, errors.New("account currency does not match deposit currency")
	}
	if req.Amount <= 0 {
		logrus.Error("Deposit amount must be positive")
		return nil, errors.New("deposit amount must be positive")
	}

	txn := &models.Transaction{
		ID:                    uuid.New(),
		SenderID:              uuid.MustParse(account.UserId),
		SenderAccountID:       uuid.MustParse(account.Id),
		SenderAccountNumber:   req.AccountNumber,
		ReceiverID:            uuid.MustParse(account.UserId),
		ReceiverAccountID:     uuid.MustParse(account.Id),
		ReceiverAccountNumber: req.AccountNumber,
		Amount:                req.Amount,
		Currency:              req.Currency,
		TransactionStatus:     models.StatusPending,
		Type:                  models.TypeDeposit,
		Note:                  req.Note,
	}

	if err := s.db.Create(txn).Error; err != nil {
		logrus.WithError(err).Error("Failed to create deposit transaction")
		return nil, err
	}

	updateResp, err := s.accountClient.UpdateBalance(ctx, &proto.UpdateBalanceRequest{
		AccountId: account.Id,
		Amount:    req.Amount,
	})
	if err != nil || !updateResp.Success {
		txn.TransactionStatus = models.StatusDeclined
		s.db.Save(txn)
		logrus.WithError(err).Error("Failed to apply deposit")
		return nil, errors.New("failed to apply deposit")
	}

	txn.TransactionStatus = models.StatusApproved
	if err := s.db.Save(txn).Error; err != nil {
		logrus.WithError(err).Error("Failed to update deposit status")
		return nil, err
	}

	return &proto.DepositResponse{Transaction: transactionToProto(txn)}, nil
}

// Withdraw funds from a single account.
func (s *TransactionService) Withdraw(ctx context.Context, req *proto.WithdrawRequest) (*proto.WithdrawResponse, error) {
	accountResp, err := s.accountClient.GetAccountByNumber(ctx, &proto.GetAccountByNumberRequest{AccountNumber: req.AccountNumber})
	if err != nil || !accountResp.Success || accountResp.Account == nil {
		logrus.WithError(err).Error("Account not found for withdrawal")
		return nil, errors.New("account not found")
	}
	account := accountResp.Account

	if account.Status != proto.AccountStatus_ACTIVE {
		logrus.Error("Account is not active")
		return nil, errors.New("account is not active")
	}
	if account.Currency != req.Currency {
		logrus.Error("Account currency does not match withdrawal currency")
		return nil, errors.New("account currency does not match withdrawal currency")
	}
	if req.Amount <= 0 {
		logrus.Error("Withdrawal amount must be positive")
		return nil, errors.New("withdrawal amount must be positive")
	}
	if account.Balance < req.Amount {
		logrus.Error("Insufficient balance for withdrawal")
		return nil, errors.New("insufficient balance")
	}

	txn := &models.Transaction{
		ID:                    uuid.New(),
		SenderID:              uuid.MustParse(account.UserId),
		SenderAccountID:       uuid.MustParse(account.Id),
		SenderAccountNumber:   req.AccountNumber,
		ReceiverID:            uuid.MustParse(account.UserId),
		ReceiverAccountID:     uuid.MustParse(account.Id),
		ReceiverAccountNumber: req.AccountNumber,
		Amount:                req.Amount,
		Currency:              req.Currency,
		TransactionStatus:     models.StatusPending,
		Type:                  models.TypeWithdraw,
		Note:                  req.Note,
	}

	if err := s.db.Create(txn).Error; err != nil {
		logrus.WithError(err).Error("Failed to create withdrawal transaction")
		return nil, err
	}

	updateResp, err := s.accountClient.UpdateBalance(ctx, &proto.UpdateBalanceRequest{
		AccountId: account.Id,
		Amount:    -req.Amount,
	})
	if err != nil || !updateResp.Success {
		txn.TransactionStatus = models.StatusDeclined
		s.db.Save(txn)
		logrus.WithError(err).Error("Failed to apply withdrawal")
		return nil, errors.New("failed to apply withdrawal")
	}

	txn.TransactionStatus = models.StatusApproved
	if err := s.db.Save(txn).Error; err != nil {
		logrus.WithError(err).Error("Failed to update withdrawal status")
		return nil, err
	}

	return &proto.WithdrawResponse{Transaction: transactionToProto(txn)}, nil
}

func (s *TransactionService) GetTransactionsByUser(ctx context.Context, req *proto.GetTransactionsByUserRequest) (*proto.GetTransactionsByUserResponse, error) {
	userID := uuid.MustParse(req.UserId)
	var transactions []*models.Transaction

	if err := s.db.Where("sender_id = ? OR receiver_id = ?", userID, userID).
		Order("created_at DESC").
		Find(&transactions).Error; err != nil {
		logrus.WithError(err).Error("Failed to fetch transactions")
		return nil, err
	}

	protoTxns := make([]*proto.Transaction, len(transactions))
	for i, txn := range transactions {
		protoTxns[i] = transactionToProto(txn)
	}

	return &proto.GetTransactionsByUserResponse{Transactions: protoTxns}, nil
}

func transactionToProto(t *models.Transaction) *proto.Transaction {
	status := proto.TransactionStatus_PENDING
	switch t.TransactionStatus {
	case models.StatusApproved:
		status = proto.TransactionStatus_APPROVED
	case models.StatusDeclined:
		status = proto.TransactionStatus_DECLINED
	}

	txnType := proto.TransactionType_TRANSFER
	switch t.Type {
	case models.TypeDeposit:
		txnType = proto.TransactionType_DEPOSIT
	case models.TypeWithdraw:
		txnType = proto.TransactionType_WITHDRAW
	}

	return &proto.Transaction{
		Id:                    t.ID.String(),
		SenderId:              t.SenderID.String(),
		SenderAccountId:       t.SenderAccountID.String(),
		SenderAccountNumber:   t.SenderAccountNumber,
		ReceiverId:            t.ReceiverID.String(),
		ReceiverAccountId:     t.ReceiverAccountID.String(),
		ReceiverAccountNumber: t.ReceiverAccountNumber,
		Amount:                t.Amount,
		Currency:              t.Currency,
		Status:                status,
		Note:                  t.Note,
		PaymentCode:           t.PaymentCode,
		Model:                 t.Model,
		CallNumber:            t.CallNumber,
		CreatedAt:             t.CreatedAt.Format("2006-01-02T15:04:05Z07:00"),
		Type:                  txnType,
	}
}
