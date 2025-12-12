package server

import (
	"account-service/config"
	"account-service/proto"
	"account-service/services"
	"fmt"
	"net"
	"os"

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
        port = "50052"
    }

    lis, err := net.Listen("tcp", fmt.Sprintf(":%s", port))
    if err != nil {
        logrus.WithError(err).Error("Failed to listen")
        return err
    }

    s.grpcServer = grpc.NewServer()

    accountService := services.NewAccountService(config.GetDB())
    proto.RegisterAccountServiceServer(s.grpcServer, accountService)

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