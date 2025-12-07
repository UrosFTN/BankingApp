import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { servicesConfig } from "../config";

const PROTO_PATH = path.resolve(__dirname, "..", "proto", "notification.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const notificationPackage = (
  grpc.loadPackageDefinition(packageDefinition) as any
).notification;

class NotificationGrpcClient {
  private client: any;

  constructor() {
    const { host, port } = servicesConfig.notification;
    const target = `${host}:${port}`;
    this.client = new notificationPackage.NotificationService(
      target,
      grpc.credentials.createInsecure(),
    );
  }

  private call(method: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client[method](data, (err: grpc.ServiceError, response: any) => {
        if (err) {
          return reject(err);
        }
        resolve(response);
      });
    });
  }

  sendNotification(data: {
    user_id: string;
    type: string;
    title: string;
    message: string;
    metadata?: string;
  }) {
    return this.call("SendNotification", data);
  }

  getNotification(data: { notification_id: string }) {
    return this.call("GetNotification", data);
  }

  listNotifications(data: { user_id: string }) {
    return this.call("ListNotifications", data);
  }

  markAsRead(data: { notification_id: string }) {
    return this.call("MarkAsRead", data);
  }
}

export const notificationClient = new NotificationGrpcClient();
