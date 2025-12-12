package services

import (
	"account-service/models"
	"account-service/proto"
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/sirupsen/logrus"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type AccountService struct {
    proto.UnimplementedAccountServiceServer
    db *gorm.DB
}

func NewAccountService(db *gorm.DB) *AccountService {
    return &AccountService{db: db}
}

func (s *AccountService) CreateAccount(ctx context.Context, req *proto.CreateAccountRequest) (*proto.CreateAccountResponse, error) {
    logrus.WithFields(logrus.Fields{
        "user_id":      req.UserId,
        "account_type": req.AccountType,
    }).Info("Creating new account")

    accountNumber := fmt.Sprintf("ACC%d%d", req.UserId, time.Now().Unix())
    iban := fmt.Sprintf("US%d%d", req.UserId, time.Now().Unix())

    account := &models.Account{
        UserID:            uint(req.UserId),
        AccountNumber:     accountNumber,
        IBAN:              iban,
        AccountHolderName: req.AccountHolderName,
        AccountType:       models.AccountType(req.AccountType.String()),
        Balance:           0,
        Currency:          req.Currency,
        Status:            models.StatusActive,
    }

    if err := s.db.Create(account).Error; err != nil {
        logrus.WithError(err).Error("Failed to create account")
        return &proto.CreateAccountResponse{
            Success: false,
            Message: "Failed to create account",
        }, status.Error(codes.Internal, "Failed to create account")
    }

    return &proto.CreateAccountResponse{
        Success: true,
        Message: "Account created successfully",
        Account: s.accountToProto(account),
    }, nil
}

func (s *AccountService) GetAccount(ctx context.Context, req *proto.GetAccountRequest) (*proto.GetAccountResponse, error) {
    var account models.Account

    if err := s.db.Where("id = ? AND user_id = ?", req.AccountId, req.UserId).First(&account).Error; err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            return &proto.GetAccountResponse{
                Success: false,
                Message: "Account not found",
            }, status.Error(codes.NotFound, "Account not found")
        }
        return &proto.GetAccountResponse{
            Success: false,
            Message: "Failed to get account",
        }, status.Error(codes.Internal, "Failed to get account")
    }

    return &proto.GetAccountResponse{
        Success: true,
        Message: "Account retrieved successfully",
        Account: s.accountToProto(&account),
    }, nil
}

func (s *AccountService) GetAccountsByUser(ctx context.Context, req *proto.GetAccountsByUserRequest) (*proto.GetAccountsByUserResponse, error) {
    var accounts []models.Account

    if err := s.db.Where("user_id = ?", req.UserId).Find(&accounts).Error; err != nil {
        return &proto.GetAccountsByUserResponse{
            Success: false,
            Message: "Failed to get accounts",
        }, status.Error(codes.Internal, "Failed to get accounts")
    }

    protoAccounts := make([]*proto.Account, len(accounts))
    for i, acc := range accounts {
        protoAccounts[i] = s.accountToProto(&acc)
    }

    return &proto.GetAccountsByUserResponse{
        Success:  true,
        Message:  "Accounts retrieved successfully",
        Accounts: protoAccounts,
    }, nil
}

func (s *AccountService) UpdateAccount(ctx context.Context, req *proto.UpdateAccountRequest) (*proto.UpdateAccountResponse, error) {
    var account models.Account

    if err := s.db.Where("id = ? AND user_id = ?", req.AccountId, req.UserId).First(&account).Error; err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            return &proto.UpdateAccountResponse{
                Success: false,
                Message: "Account not found",
            }, status.Error(codes.NotFound, "Account not found")
        }
        return &proto.UpdateAccountResponse{
            Success: false,
            Message: "Failed to find account",
        }, status.Error(codes.Internal, "Failed to find account")
    }

    if req.AccountHolderName != nil {
        account.AccountHolderName = *req.AccountHolderName
    }
    if req.Status != nil {
        account.Status = models.AccountStatus(req.Status.String())
    }

    if err := s.db.Save(&account).Error; err != nil {
        return &proto.UpdateAccountResponse{
            Success: false,
            Message: "Failed to update account",
        }, status.Error(codes.Internal, "Failed to update account")
    }

    return &proto.UpdateAccountResponse{
        Success: true,
        Message: "Account updated successfully",
        Account: s.accountToProto(&account),
    }, nil
}

func (s *AccountService) DeleteAccount(ctx context.Context, req *proto.DeleteAccountRequest) (*proto.DeleteAccountResponse, error) {
    result := s.db.Where("id = ? AND user_id = ?", req.AccountId, req.UserId).Delete(&models.Account{})

    if result.Error != nil {
        return &proto.DeleteAccountResponse{
            Success: false,
            Message: "Failed to delete account",
        }, status.Error(codes.Internal, "Failed to delete account")
    }

    if result.RowsAffected == 0 {
        return &proto.DeleteAccountResponse{
            Success: false,
            Message: "Account not found",
        }, status.Error(codes.NotFound, "Account not found")
    }

    return &proto.DeleteAccountResponse{
        Success: true,
        Message: "Account deleted successfully",
    }, nil
}

func (s *AccountService) GetBalance(ctx context.Context, req *proto.GetBalanceRequest) (*proto.GetBalanceResponse, error) {
    var account models.Account

    if err := s.db.Where("id = ? AND user_id = ?", req.AccountId, req.UserId).First(&account).Error; err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            return &proto.GetBalanceResponse{
                Success: false,
                Message: "Account not found",
            }, status.Error(codes.NotFound, "Account not found")
        }
        return &proto.GetBalanceResponse{
            Success: false,
            Message: "Failed to get balance",
        }, status.Error(codes.Internal, "Failed to get balance")
    }

    return &proto.GetBalanceResponse{
        Success:  true,
        Message:  "Balance retrieved successfully",
        Balance:  account.Balance,
        Currency: account.Currency,
    }, nil
}

func (s *AccountService) UpdateBalance(ctx context.Context, req *proto.UpdateBalanceRequest) (*proto.UpdateBalanceResponse, error) {
    logrus.WithFields(logrus.Fields{
        "account_id":     req.AccountId,
        "amount":         req.Amount,
        "transaction_id": req.TransactionId,
    }).Info("Updating account balance")

    tx := s.db.Begin()
    defer func() {
        if r := recover(); r != nil {
            tx.Rollback()
        }
    }()

    var account models.Account

    if err := tx.Clauses(clause.Locking{Strength: "UPDATE"}).Where("id = ?", req.AccountId).First(&account).Error; err != nil {
        tx.Rollback()
        if errors.Is(err, gorm.ErrRecordNotFound) {
            return &proto.UpdateBalanceResponse{
                Success: false,
                Message: "Account not found",
            }, status.Error(codes.NotFound, "Account not found")
        }
        return &proto.UpdateBalanceResponse{
            Success: false,
            Message: "Failed to get account",
        }, status.Error(codes.Internal, "Failed to get account")
    }

    newBalance := account.Balance + req.Amount
    if newBalance < 0 {
        tx.Rollback()
        logrus.WithFields(logrus.Fields{
            "account_id":    req.AccountId,
            "current":       account.Balance,
            "amount":        req.Amount,
            "would_be":      newBalance,
        }).Warn("Insufficient balance")
        return &proto.UpdateBalanceResponse{
            Success: false,
            Message: "Insufficient balance",
        }, status.Error(codes.FailedPrecondition, "Insufficient balance")
    }

    account.Balance = newBalance
    if err := tx.Save(&account).Error; err != nil {
        tx.Rollback()
        return &proto.UpdateBalanceResponse{
            Success: false,
            Message: "Failed to update balance",
        }, status.Error(codes.Internal, "Failed to update balance")
    }

    if err := tx.Commit().Error; err != nil {
        return &proto.UpdateBalanceResponse{
            Success: false,
            Message: "Failed to commit transaction",
        }, status.Error(codes.Internal, "Failed to commit transaction")
    }

    logrus.WithFields(logrus.Fields{
        "account_id":  req.AccountId,
        "new_balance": account.Balance,
    }).Info("Balance updated successfully")

    return &proto.UpdateBalanceResponse{
        Success:    true,
        Message:    "Balance updated successfully",
        NewBalance: account.Balance,
    }, nil
}

func (s *AccountService) accountToProto(account *models.Account) *proto.Account {
    return &proto.Account{
        Id:                uint32(account.ID),
        UserId:            uint32(account.UserID),
        AccountNumber:     account.AccountNumber,
        Iban:              account.IBAN,
        AccountHolderName: account.AccountHolderName,
        AccountType:       s.accountTypeToProto(account.AccountType),
        Balance:           account.Balance,
        Currency:          account.Currency,
        Status:            s.accountStatusToProto(account.Status),
        CreatedAt:         account.CreatedAt.Format(time.RFC3339),
        UpdatedAt:         account.UpdatedAt.Format(time.RFC3339),
    }
}

func (s *AccountService) accountTypeToProto(t models.AccountType) proto.AccountType {
    switch t {
    case models.TypeChecking:
        return proto.AccountType_CHECKING
    case models.TypeSavings:
        return proto.AccountType_SAVINGS
    case models.TypeCredit:
        return proto.AccountType_CREDIT
    default:
        return proto.AccountType_CHECKING
    }
}

func (s *AccountService) accountStatusToProto(status models.AccountStatus) proto.AccountStatus {
    switch status {
    case models.StatusActive:
        return proto.AccountStatus_ACTIVE
    case models.StatusClosed:
        return proto.AccountStatus_CLOSED
    case models.StatusFrozen:
        return proto.AccountStatus_FROZEN
    default:
        return proto.AccountStatus_ACTIVE
    }
}