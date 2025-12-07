import { pool } from "./database";
import {
  Notification,
  CreateNotificationDto,
} from "../models/notification.model";

export class NotificationRepository {
  async create(data: CreateNotificationDto): Promise<Notification> {
    const { v4: uuidv4 } = await import("uuid");
    const id = uuidv4();
    const result = await pool.query(
      `INSERT INTO notifications (id, user_id, type, title, message, metadata, is_read)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        id,
        data.user_id,
        data.type,
        data.title,
        data.message,
        data.metadata || null,
        false,
      ],
    );
    return result.rows[0];
  }

  async findById(id: string): Promise<Notification | null> {
    const result = await pool.query(
      `SELECT * FROM notifications WHERE id = $1`,
      [id],
    );
    return result.rows[0] || null;
  }

  async listByUser(userId: string): Promise<Notification[]> {
    const result = await pool.query(
      `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId],
    );
    return result.rows;
  }

  async markAsRead(id: string): Promise<Notification | null> {
    const result = await pool.query(
      `UPDATE notifications SET is_read = true, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
      [id],
    );
    return result.rows[0] || null;
  }
}

export const notificationRepository = new NotificationRepository();
