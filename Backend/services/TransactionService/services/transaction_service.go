package services

import (
	accountProto "account-service/proto"
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
	accountClient accountProto.AccountServiceClient
}

func NewTransactionService(db *gorm.DB) *TransactionService {
	// Connect to AccountService gRPC
	conn, err := grpc.Dial("account-service:50052", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		logrus.WithError(err).Fatal("Failed to connect to AccountService")
	}

	accountClient := accountProto.NewAccountServiceClient(conn)

	return &TransactionService{
		db:            db,
		accountClient: accountClient,
	}
}

func (s *TransactionService) CreateTransaction(ctx context.Context, req *proto.CreateTransactionRequest) (*proto.CreateTransactionResponse, error) {
	// Create transaction with pending status
	txn := &models.Transaction{
		ID:                uuid.New(),
		SenderID:          uuid.MustParse(req.SenderId),
		SenderAccountID:   uuid.MustParse(req.SenderAccountId),
		ReceiverID:        uuid.MustParse(req.ReceiverId),
		ReceiverAccountID: uuid.MustParse(req.ReceiverAccountId),
		Amount:            req.Amount,
		Currency:          req.Currency,
		TransactionStatus: models.StatusPending,
		Note:              req.Note,
		PaymentCode:       req.PaymentCode,
		Model:             req.Model,
		CallNumber:        req.CallNumber,
	}

	// Save transaction as pending
	if err := s.db.Create(txn).Error; err != nil {
		logrus.WithError(err).Error("Failed to create transaction")
		return nil, err
	}

	// Call AccountService to deduct from sender
	deductResp, err := s.accountClient.UpdateBalance(ctx, &accountProto.UpdateBalanceRequest{
		AccountId: req.SenderAccountId,
		Amount:    -req.Amount,
	})
	if err != nil || !deductResp.Success {
		txn.TransactionStatus = models.StatusDeclined
		s.db.Save(txn)
		logrus.WithError(err).Error("Failed to deduct from sender account")
		return nil, errors.New("failed to deduct from sender account")
	}

	// Call AccountService to add to receiver
	addResp, err := s.accountClient.UpdateBalance(ctx, &accountProto.UpdateBalanceRequest{
		AccountId: req.ReceiverAccountId,
		Amount:    req.Amount,
	})
	if err != nil || !addResp.Success {
		// Rollback: refund sender
		s.accountClient.UpdateBalance(ctx, &accountProto.UpdateBalanceRequest{
			AccountId: req.SenderAccountId,
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
		Id:                t.ID.String(),
		SenderId:          t.SenderID.String(),
		SenderAccountId:   t.SenderAccountID.String(),
		ReceiverId:        t.ReceiverID.String(),
		ReceiverAccountId: t.ReceiverAccountID.String(),
		Amount:            t.Amount,
		Currency:          t.Currency,
		Status:            status,
		Note:              t.Note,
		PaymentCode:       t.PaymentCode,
		Model:             t.Model,
		CallNumber:        t.CallNumber,
		CreatedAt:         t.CreatedAt.Format("2006-01-02T15:04:05Z07:00"),
	}
}