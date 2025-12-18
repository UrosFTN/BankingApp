package config

import (
	"fmt"
	"os"
	"time"
	"transaction-service/models"

	"github.com/sirupsen/logrus"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

type DatabaseConfig struct {
    Host     string
    Port     string
    User     string
    Password string
    DBName   string
}

func LoadDatabaseConfig() *DatabaseConfig {
    return &DatabaseConfig{
        Host:     getEnv("DB_HOST", "transaction-db"),
        Port:     getEnv("DB_PORT", "5433"),
        User:     getEnv("DB_USER", "postgres"),
        Password: getEnv("DB_PASSWORD", "postgres"),
        DBName:   getEnv("DB_NAME", "transaction_db"),
    }
}

func ConnectDatabase() error {
    config := LoadDatabaseConfig()

    dsn := fmt.Sprintf(
        "host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
        config.Host, config.Port, config.User, config.Password, config.DBName,
    )

    logrus.Info("Connecting to database...")

    var err error
    DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
        Logger: logger.Default.LogMode(logger.Info),
    })

    if err != nil {
        logrus.WithError(err).Error("Failed to connect to database")
        return err
    }

    sqlDB, err := DB.DB()
    if err != nil {
        logrus.WithError(err).Error("Failed to get database instance")
        return err
    }

    sqlDB.SetMaxIdleConns(10)
    sqlDB.SetMaxOpenConns(100)
    sqlDB.SetConnMaxLifetime(time.Hour)

    logrus.Info("Database connected successfully")

    if err := DB.AutoMigrate(&models.Transaction{}); err != nil {
        logrus.WithError(err).Error("Failed to run auto-migration")
        return err
    }

    logrus.Info("Database migration completed")

    return nil
}

func GetDB() *gorm.DB {
    return DB
}

func CloseDatabase() error {
    sqlDB, err := DB.DB()
    if err != nil {
        return err
    }
    return sqlDB.Close()
}

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}