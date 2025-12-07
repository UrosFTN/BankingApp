import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import dotenv from "dotenv";
import { serverConfig } from "./config";
import {
  authController,
  deviceController,
  passwordController,
} from "./controllers";
import logger from "./utils/logger";

dotenv.config();

const PROTO_PATH = path.resolve(__dirname, "..", "proto", "auth.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const authProto = (grpc.loadPackageDefinition(packageDefinition) as any).auth;

export const server = new grpc.Server();

server.addService(authProto.AuthService.service, {
  Register: authController.register.bind(authController),
  Login: authController.login.bind(authController),
  LoginWithDevice: deviceController.loginWithDevice.bind(deviceController),
  RefreshToken: authController.refreshToken.bind(authController),
  RevokeToken: authController.revokeToken.bind(authController),
  ValidateToken: authController.validateToken.bind(authController),
  RegisterDevice: deviceController.registerDevice.bind(deviceController),
  GetUserDevices: deviceController.getUserDevices.bind(deviceController),
  RevokeDevice: deviceController.revokeDevice.bind(deviceController),
  RequestPasswordReset:
    passwordController.requestPasswordReset.bind(passwordController),
  ResetPassword: passwordController.resetPassword.bind(passwordController),
  ChangePassword: passwordController.changePassword.bind(passwordController),
});

export async function startServer() {
  const address = `${serverConfig.host}:${serverConfig.port}`;

  server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err) => {
    if (err) {
      logger.error(err, "Failed to bind gRPC server");
      process.exit(1);
    }

    server.start();
    logger.info(`gRPC AuthService running at ${address}`);
  });
}

process.on("SIGINT", async () => {
  logger.info("Shutting down gRPC server...");
  server.forceShutdown();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  logger.info("Shutting down gRPC server...");
  server.forceShutdown();
  process.exit(0);
});
