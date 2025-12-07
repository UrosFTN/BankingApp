import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import dotenv from "dotenv";
import { serverConfig } from "./config";
import { accountController } from "./controllers/account.controller";
import logger from "./utils/logger";

dotenv.config();

const PROTO_PATH = path.resolve(__dirname, "..", "proto", "account.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const accountProto = (grpc.loadPackageDefinition(packageDefinition) as any)
  .account;

export const server = new grpc.Server();

server.addService(accountProto.AccountService.service, {
  CreateAccount: accountController.createAccount.bind(accountController),
  GetAccount: accountController.getAccount.bind(accountController),
  ListAccounts: accountController.listAccounts.bind(accountController),
  Deposit: accountController.deposit.bind(accountController),
  Withdraw: accountController.withdraw.bind(accountController),
  Transfer: accountController.transfer.bind(accountController),
});

export async function startServer() {
  const address = `${serverConfig.host}:${serverConfig.port}`;
  server.bindAsync(
    address,
    grpc.ServerCredentials.createInsecure(),
    (err: Error | null) => {
      if (err) {
        logger.error(err, "Failed to bind gRPC server");
        process.exit(1);
      }
      server.start();
      logger.info(`gRPC AccountService running at ${address}`);
    },
  );
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
