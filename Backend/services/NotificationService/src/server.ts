import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import dotenv from "dotenv";
import { serverConfig } from "./config";
import { notificationController } from "./controllers/notification.controller";
import logger from "./utils/logger";

dotenv.config();

const PROTO_PATH = path.resolve(__dirname, "..", "proto", "notification.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const notificationProto = (grpc.loadPackageDefinition(packageDefinition) as any)
  .notification;

export const server = new grpc.Server();

server.addService(notificationProto.NotificationService.service, {
  SendNotification: notificationController.sendNotification.bind(
    notificationController,
  ),
  GetNotification: notificationController.getNotification.bind(
    notificationController,
  ),
  ListNotifications: notificationController.listNotifications.bind(
    notificationController,
  ),
  MarkAsRead: notificationController.markAsRead.bind(notificationController),
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
      logger.info(`gRPC NotificationService running at ${address}`);
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
