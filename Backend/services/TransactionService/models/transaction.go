package models

import (
	"time"

	"github.com/google/uuid"
)

type TransactionStatus string

const (
	StatusApproved TransactionStatus = "approved"
	StatusPending TransactionStatus = "pending"
	StatusDeclined TransactionStatus = "declined"
)

type Transaction struct {
	ID uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	SenderID uuid.UUID `gorm:"type:uuid;index;not null" json:"sender_id"`
	SenderAccountID uuid.UUID `gorm:"type:uuid;index;not null" json:"sender_account_id"`
	ReceiverID uuid.UUID `gorm:"type:uuid;index;not null" json:"receiver_id"`
	ReceiverAccountID uuid.UUID `gorm:"type:uuid;index;not null" json:"receiver_account_id"`
	TransactionStatus TransactionStatus `gorm:"type:varchar(50);not null;default:'pending'" json:"status"`
	CreatedAt time.Time `json:"created_at"`
	Amount float64 `gorm:"type:decimal(15,2);not null;default:0" json:"amount"`
	Currency          string         `gorm:"type:varchar(3);not null;default:'USD'" json:"currency"`
	Note string `gorm:"type:varchar(100);not null;default:''" json:"note"`
	PaymentCode string `gorm:"type:varchar(3);not null;default:''" json:"payment_code"`
	Model string `gorm:"type:varchar(2);not null;default:''" json:"model"`
	CallNumber string `gorm:"type:varchar(30);not null;default:''" json:"call_number"`
}