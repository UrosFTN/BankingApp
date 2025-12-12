package models

import (
	"database/sql/driver"
	"time"
)

type AccountStatus string

const (
	StatusActive AccountStatus = "active"
	StatusClosed AccountStatus = "closed"
	StatusFrozen AccountStatus = "frozen"
)

type AccountType string

const (
	TypeChecking AccountType = "checking"
	TypeSavings  AccountType = "savings"
	TypeCredit   AccountType = "credit"
)

type Account struct {
	ID                uint           `gorm:"primaryKey" json:"id"`
	UserID            uint           `gorm:"index;not null" json:"user_id"`
	AccountNumber     string         `gorm:"uniqueIndex;not null" json:"account_number"`
	IBAN              string         `gorm:"uniqueIndex;not null" json:"iban"`
	AccountHolderName string         `gorm:"not null" json:"account_holder_name"`
	AccountType       AccountType    `gorm:"type:varchar(50);not null" json:"account_type"`
	Balance           float64        `gorm:"type:decimal(15,2);not null;default:0" json:"balance"`
	Currency          string         `gorm:"type:varchar(3);not null;default:'USD'" json:"currency"`
	Status            AccountStatus  `gorm:"type:varchar(50);not null;default:'active'" json:"status"`
	CreatedAt         time.Time      `json:"created_at"`
	UpdatedAt         time.Time      `json:"updated_at"`
}

func (s AccountStatus) Value() (driver.Value, error) {
    return string(s), nil
}

func (s *AccountStatus) Scan(value interface{}) error {
    *s = AccountStatus(value.(string))
    return nil
}

func (t AccountType) Value() (driver.Value, error) {
    return string(t), nil
}

func (t *AccountType) Scan(value interface{}) error {
    *t = AccountType(value.(string))
    return nil
}

func (Account) TableName() string {
    return "accounts"
}