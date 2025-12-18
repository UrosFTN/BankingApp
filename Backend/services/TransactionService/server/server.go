package server

import (
	"fmt"
	"net"
	"os"
	"transaction-service/config"
	"transaction-service/proto"
	"transaction-service/services"

	"github.com/sirupsen/logrus"
	"google.golang.org/grpc"
)

type Server struct {
	grpcServer *grpc.Server
}

func NewServer() *Server {
	return &Server{}
}

func (s *Server) Start() error {
    port := os.Getenv("PORT")
    if port == "" {
        port = "50053"
    }

    lis, err := net.Listen("tcp", fmt.Sprintf(":%s", port))
    if err != nil {
        logrus.WithError(err).Error("Failed to listen")
        return err
    }

    s.grpcServer = grpc.NewServer()

    TransactionService := services.NewTransactionService(config.GetDB())
    proto.RegisterTransactionServiceServer(s.grpcServer, TransactionService)

    logrus.Infof("gRPC server listening on port %s", port)

    if err := s.grpcServer.Serve(lis); err != nil {
        logrus.WithError(err).Error("Failed to serve gRPC")
        return err
    }

    return nil
}

func (s *Server) Stop() {
    if s.grpcServer != nil {
        s.grpcServer.GracefulStop()
        logrus.Info("gRPC server stopped gracefully")
    }
}