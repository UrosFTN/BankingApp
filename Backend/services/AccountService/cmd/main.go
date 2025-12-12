package main

import (
	"account-service/config"
	"account-service/server"
	"os"
	"os/signal"
	"syscall"

	"github.com/sirupsen/logrus"
)

func main() {
    logrus.SetFormatter(&logrus.JSONFormatter{})
    logrus.SetLevel(logrus.InfoLevel)

    logrus.Info("Starting Account Service...")

    if err := config.ConnectDatabase(); err != nil {
        logrus.WithError(err).Fatal("Failed to connect to database")
    }
    defer config.CloseDatabase()

    srv := server.NewServer()
    go func() {
        if err := srv.Start(); err != nil {
            logrus.WithError(err).Fatal("Failed to start gRPC server")
        }
    }()

    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit

    logrus.Info("Shutting down Account Service...")
    srv.Stop()
    logrus.Info("Account Service stopped")
}