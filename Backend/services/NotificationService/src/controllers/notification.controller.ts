import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import { notificationService } from "../services/notification.service";
import logger from "../utils/logger";

export class NotificationController {
  async sendNotification(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { user_id, type, title, message, metadata } = call.request;
      const notification = await notificationService.sendNotification(
        user_id,
        type,
        title,
        message,
        metadata,
      );
      callback(null, {
        success: true,
        message: "Notification sent",
        notification: this.map(notification),
      });
    } catch (error: any) {
      logger.error(error, "Error in sendNotification");
      callback({
        code: status.INTERNAL,
        message: error.message || "Send failed",
      });
    }
  }

  async getNotification(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { notification_id } = call.request;
      const notification = await notificationService.getNotification(
        notification_id,
      );
      callback(null, {
        success: true,
        message: "Notification fetched",
        notification: this.map(notification),
      });
    } catch (error: any) {
      logger.error(error, "Error in getNotification");
      callback({
        code: status.NOT_FOUND,
        message: error.message || "Not found",
      });
    }
  }

  async listNotifications(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { user_id } = call.request;
      const notifications = await notificationService.listNotifications(
        user_id,
      );
      callback(null, {
        notifications: notifications.map(this.map),
      });
    } catch (error: any) {
      logger.error(error, "Error in listNotifications");
      callback({
        code: status.INTERNAL,
        message: error.message || "List failed",
      });
    }
  }

  async markAsRead(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { notification_id } = call.request;
      const notification = await notificationService.markAsRead(
        notification_id,
      );
      callback(null, {
        success: true,
        message: "Notification marked as read",
        notification: this.map(notification),
      });
    } catch (error: any) {
      logger.error(error, "Error in markAsRead");
      callback({
        code: status.NOT_FOUND,
        message: error.message || "Not found",
      });
    }
  }

  private map = (notification: any) => ({
    id: notification.id,
    user_id: notification.user_id,
    type: notification.type,
    title: notification.title,
    message: notification.message,
    metadata: notification.metadata,
    is_read: notification.is_read,
    created_at:
      notification.created_at?.toISOString?.() || notification.created_at,
    updated_at:
      notification.updated_at?.toISOString?.() || notification.updated_at,
  });
}

export const notificationController = new NotificationController();
