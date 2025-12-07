import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import dotenv from "dotenv";
import { serverConfig } from "./config";
import { transactionController } from "./controllers/transaction.controller";
import logger from "./utils/logger";

dotenv.config();

const PROTO_PATH = path.resolve(__dirname, "..", "proto", "transaction.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const transactionProto = (grpc.loadPackageDefinition(packageDefinition) as any)
  .transaction;

export const server = new grpc.Server();

server.addService(transactionProto.TransactionService.service, {
  Deposit: transactionController.deposit.bind(transactionController),
  Withdraw: transactionController.withdraw.bind(transactionController),
  Transfer: transactionController.transfer.bind(transactionController),
  GetTransaction: transactionController.getTransaction.bind(
    transactionController,
  ),
  ListTransactions: transactionController.listTransactions.bind(
    transactionController,
  ),
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
      logger.info(`gRPC TransactionService running at ${address}`);
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
