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
	// Connect to AccountService gRPC
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

	// Validate sender account is active
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

	// Validate receiver account is active
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
		Note:                  req.Note,
		PaymentCode:           req.PaymentCode,
		Model:                 req.Model,
		CallNumber:            req.CallNumber,
	}

	// Save transaction as pending
	if err := s.db.Create(txn).Error; err != nil {
		logrus.WithError(err).Error("Failed to create transaction")
		return nil, err
	}

	// Call AccountService to deduct from sender
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

	// Call AccountService to add to receiver
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

	// Both succeeded, mark as approved
	txn.TransactionStatus = models.StatusApproved
	if err := s.db.Save(txn).Error; err != nil {
		logrus.WithError(err).Error("Failed to update transaction status to approved")
		return nil, err
	}

	return &proto.CreateTransactionResponse{
		Transaction: transactionToProto(txn),
	}, nil
}

func (s *TransactionService) GetTransactionsByUser(ctx context.Context, req *proto.GetTransactionsByUserRequest) (*proto.GetTransactionsByUserResponse, error) {
	userID := uuid.MustParse(req.UserId)
	var transactions []*models.Transaction

	// Get all transactions where user is sender or receiver
	if err := s.db.Where("sender_id = ? OR reciever_id = ?", userID, userID).
		Order("created_at DESC").
		Find(&transactions).Error; err != nil {
		logrus.WithError(err).Error("Failed to fetch transactions")
		return nil, err
	}

	protoTxns := make([]*proto.Transaction, len(transactions))
	for i, txn := range transactions {
		protoTxns[i] = transactionToProto(txn)
	}

	return &proto.GetTransactionsByUserResponse{
		Transactions: protoTxns,
	}, nil
}

func transactionToProto(t *models.Transaction) *proto.Transaction {
	status := proto.TransactionStatus_PENDING
	switch t.TransactionStatus {
	case models.StatusApproved:
		status = proto.TransactionStatus_APPROVED
	case models.StatusDeclined:
		status = proto.TransactionStatus_DECLINED
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
	}
}