export type NotificationType =
  | "TRANSACTION"
  | "ACCOUNT"
  | "SECURITY"
  | "SYSTEM";

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  metadata?: string | null;
  is_read: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateNotificationDto {
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  metadata?: string | null;
}
