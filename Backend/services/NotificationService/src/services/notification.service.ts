import { notificationRepository } from "../repositories/notification.repository";
import { Notification, NotificationType } from "../models/notification.model";
import logger from "../utils/logger";

export class NotificationService {
  async sendNotification(
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
    metadata?: string,
  ): Promise<Notification> {
    const notification = await notificationRepository.create({
      user_id: userId,
      type,
      title,
      message,
      metadata: metadata || null,
    });

    logger.info({ userId, type, title }, "Notification created");

    // TODO: Send push notification, email, SMS, etc.
    // This is where you'd integrate with email service, FCM, etc.

    return notification;
  }

  async getNotification(id: string): Promise<Notification> {
    const notification = await notificationRepository.findById(id);
    if (!notification) {
      throw new Error("Notification not found");
    }
    return notification;
  }

  async listNotifications(userId: string): Promise<Notification[]> {
    return notificationRepository.listByUser(userId);
  }

  async markAsRead(id: string): Promise<Notification> {
    const notification = await notificationRepository.markAsRead(id);
    if (!notification) {
      throw new Error("Notification not found");
    }
    logger.info({ notificationId: id }, "Notification marked as read");
    return notification;
  }
}

export const notificationService = new NotificationService();
