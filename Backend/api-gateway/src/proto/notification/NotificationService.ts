// Original file: src/proto/notification.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetNotificationRequest as _notification_GetNotificationRequest, GetNotificationRequest__Output as _notification_GetNotificationRequest__Output } from '../notification/GetNotificationRequest';
import type { ListNotificationsRequest as _notification_ListNotificationsRequest, ListNotificationsRequest__Output as _notification_ListNotificationsRequest__Output } from '../notification/ListNotificationsRequest';
import type { ListNotificationsResponse as _notification_ListNotificationsResponse, ListNotificationsResponse__Output as _notification_ListNotificationsResponse__Output } from '../notification/ListNotificationsResponse';
import type { MarkAsReadRequest as _notification_MarkAsReadRequest, MarkAsReadRequest__Output as _notification_MarkAsReadRequest__Output } from '../notification/MarkAsReadRequest';
import type { NotificationResponse as _notification_NotificationResponse, NotificationResponse__Output as _notification_NotificationResponse__Output } from '../notification/NotificationResponse';
import type { SendNotificationRequest as _notification_SendNotificationRequest, SendNotificationRequest__Output as _notification_SendNotificationRequest__Output } from '../notification/SendNotificationRequest';

export interface NotificationServiceClient extends grpc.Client {
  GetNotification(argument: _notification_GetNotificationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_notification_NotificationResponse__Output>): grpc.ClientUnaryCall;
  GetNotification(argument: _notification_GetNotificationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_notification_NotificationResponse__Output>): grpc.ClientUnaryCall;
  GetNotification(argument: _notification_GetNotificationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_notification_NotificationResponse__Output>): grpc.ClientUnaryCall;
  GetNotification(argument: _notification_GetNotificationRequest, callback: grpc.requestCallback<_notification_NotificationResponse__Output>): grpc.ClientUnaryCall;
  getNotification(argument: _notification_GetNotificationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_notification_NotificationResponse__Output>): grpc.ClientUnaryCall;
  getNotification(argument: _notification_GetNotificationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_notification_NotificationResponse__Output>): grpc.ClientUnaryCall;
  getNotification(argument: _notification_GetNotificationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_notification_NotificationResponse__Output>): grpc.ClientUnaryCall;
  getNotification(argument: _notification_GetNotificationRequest, callback: grpc.requestCallback<_notification_NotificationResponse__Output>): grpc.ClientUnaryCall;
  
  ListNotifications(argument: _notification_ListNotificationsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_notification_ListNotificationsResponse__Output>): grpc.ClientUnaryCall;
  ListNotifications(argument: _notification_ListNotificationsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_notification_ListNotificationsResponse__Output>): grpc.ClientUnaryCall;
  ListNotifications(argument: _notification_ListNotificationsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_notification_ListNotificationsResponse__Output>): grpc.ClientUnaryCall;
  ListNotifications(argument: _notification_ListNotificationsRequest, callback: grpc.requestCallback<_notification_ListNotificationsResponse__Output>): grpc.ClientUnaryCall;
  listNotifications(argument: _notification_ListNotificationsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_notification_ListNotificationsResponse__Output>): grpc.ClientUnaryCall;
  listNotifications(argument: _notification_ListNotificationsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_notification_ListNotificationsResponse__Output>): grpc.ClientUnaryCall;
  listNotifications(argument: _notification_ListNotificationsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_notification_ListNotificationsResponse__Output>): grpc.ClientUnaryCall;
  listNotifications(argument: _notification_ListNotificationsRequest, callback: grpc.requestCallback<_notification_ListNotificationsResponse__Output>): grpc.ClientUnaryCall;
  
  MarkAsRead(argument: _notification_MarkAsReadRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_notification_NotificationResponse__Output>): grpc.ClientUnaryCall;
  MarkAsRead(argument: _notification_MarkAsReadRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_notification_NotificationResponse__Output>): grpc.ClientUnaryCall;
  MarkAsRead(argument: _notification_MarkAsReadRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_notification_NotificationResponse__Output>): grpc.ClientUnaryCall;
  MarkAsRead(argument: _notification_MarkAsReadRequest, callback: grpc.requestCallback<_notification_NotificationResponse__Output>): grpc.ClientUnaryCall;
  markAsRead(argument: _notification_MarkAsReadRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_notification_NotificationResponse__Output>): grpc.ClientUnaryCall;
  markAsRead(argument: _notification_MarkAsReadRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_notification_NotificationResponse__Output>): grpc.ClientUnaryCall;
  markAsRead(argument: _notification_MarkAsReadRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_notification_NotificationResponse__Output>): grpc.ClientUnaryCall;
  markAsRead(argument: _notification_MarkAsReadRequest, callback: grpc.requestCallback<_notification_NotificationResponse__Output>): grpc.ClientUnaryCall;
  
  SendNotification(argument: _notification_SendNotificationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_notification_NotificationResponse__Output>): grpc.ClientUnaryCall;
  SendNotification(argument: _notification_SendNotificationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_notification_NotificationResponse__Output>): grpc.ClientUnaryCall;
  SendNotification(argument: _notification_SendNotificationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_notification_NotificationResponse__Output>): grpc.ClientUnaryCall;
  SendNotification(argument: _notification_SendNotificationRequest, callback: grpc.requestCallback<_notification_NotificationResponse__Output>): grpc.ClientUnaryCall;
  sendNotification(argument: _notification_SendNotificationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_notification_NotificationResponse__Output>): grpc.ClientUnaryCall;
  sendNotification(argument: _notification_SendNotificationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_notification_NotificationResponse__Output>): grpc.ClientUnaryCall;
  sendNotification(argument: _notification_SendNotificationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_notification_NotificationResponse__Output>): grpc.ClientUnaryCall;
  sendNotification(argument: _notification_SendNotificationRequest, callback: grpc.requestCallback<_notification_NotificationResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface NotificationServiceHandlers extends grpc.UntypedServiceImplementation {
  GetNotification: grpc.handleUnaryCall<_notification_GetNotificationRequest__Output, _notification_NotificationResponse>;
  
  ListNotifications: grpc.handleUnaryCall<_notification_ListNotificationsRequest__Output, _notification_ListNotificationsResponse>;
  
  MarkAsRead: grpc.handleUnaryCall<_notification_MarkAsReadRequest__Output, _notification_NotificationResponse>;
  
  SendNotification: grpc.handleUnaryCall<_notification_SendNotificationRequest__Output, _notification_NotificationResponse>;
  
}

export interface NotificationServiceDefinition extends grpc.ServiceDefinition {
  GetNotification: MethodDefinition<_notification_GetNotificationRequest, _notification_NotificationResponse, _notification_GetNotificationRequest__Output, _notification_NotificationResponse__Output>
  ListNotifications: MethodDefinition<_notification_ListNotificationsRequest, _notification_ListNotificationsResponse, _notification_ListNotificationsRequest__Output, _notification_ListNotificationsResponse__Output>
  MarkAsRead: MethodDefinition<_notification_MarkAsReadRequest, _notification_NotificationResponse, _notification_MarkAsReadRequest__Output, _notification_NotificationResponse__Output>
  SendNotification: MethodDefinition<_notification_SendNotificationRequest, _notification_NotificationResponse, _notification_SendNotificationRequest__Output, _notification_NotificationResponse__Output>
}
