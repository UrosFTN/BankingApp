import type * as grpc from "@grpc/grpc-js";
import type { MessageTypeDefinition } from "@grpc/proto-loader";

import type {
  GetNotificationRequest as _notification_GetNotificationRequest,
  GetNotificationRequest__Output as _notification_GetNotificationRequest__Output,
} from "./notification/GetNotificationRequest";
import type {
  ListNotificationsRequest as _notification_ListNotificationsRequest,
  ListNotificationsRequest__Output as _notification_ListNotificationsRequest__Output,
} from "./notification/ListNotificationsRequest";
import type {
  ListNotificationsResponse as _notification_ListNotificationsResponse,
  ListNotificationsResponse__Output as _notification_ListNotificationsResponse__Output,
} from "./notification/ListNotificationsResponse";
import type {
  MarkAsReadRequest as _notification_MarkAsReadRequest,
  MarkAsReadRequest__Output as _notification_MarkAsReadRequest__Output,
} from "./notification/MarkAsReadRequest";
import type {
  Notification as _notification_Notification,
  Notification__Output as _notification_Notification__Output,
} from "./notification/Notification";
import type {
  NotificationResponse as _notification_NotificationResponse,
  NotificationResponse__Output as _notification_NotificationResponse__Output,
} from "./notification/NotificationResponse";
import type {
  NotificationServiceClient as _notification_NotificationServiceClient,
  NotificationServiceDefinition as _notification_NotificationServiceDefinition,
} from "./notification/NotificationService";
import type {
  SendNotificationRequest as _notification_SendNotificationRequest,
  SendNotificationRequest__Output as _notification_SendNotificationRequest__Output,
} from "./notification/SendNotificationRequest";

type SubtypeConstructor<
  Constructor extends new (...args: any) => any,
  Subtype,
> = {
  new (...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  notification: {
    GetNotificationRequest: MessageTypeDefinition<
      _notification_GetNotificationRequest,
      _notification_GetNotificationRequest__Output
    >;
    ListNotificationsRequest: MessageTypeDefinition<
      _notification_ListNotificationsRequest,
      _notification_ListNotificationsRequest__Output
    >;
    ListNotificationsResponse: MessageTypeDefinition<
      _notification_ListNotificationsResponse,
      _notification_ListNotificationsResponse__Output
    >;
    MarkAsReadRequest: MessageTypeDefinition<
      _notification_MarkAsReadRequest,
      _notification_MarkAsReadRequest__Output
    >;
    Notification: MessageTypeDefinition<
      _notification_Notification,
      _notification_Notification__Output
    >;
    NotificationResponse: MessageTypeDefinition<
      _notification_NotificationResponse,
      _notification_NotificationResponse__Output
    >;
    NotificationService: SubtypeConstructor<
      typeof grpc.Client,
      _notification_NotificationServiceClient
    > & { service: _notification_NotificationServiceDefinition };
    SendNotificationRequest: MessageTypeDefinition<
      _notification_SendNotificationRequest,
      _notification_SendNotificationRequest__Output
    >;
  };
}
