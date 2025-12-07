// Original file: src/proto/notification.proto

import type { Notification as _notification_Notification, Notification__Output as _notification_Notification__Output } from '../notification/Notification';

export interface NotificationResponse {
  'success'?: (boolean);
  'message'?: (string);
  'notification'?: (_notification_Notification | null);
}

export interface NotificationResponse__Output {
  'success': (boolean);
  'message': (string);
  'notification': (_notification_Notification__Output | null);
}
