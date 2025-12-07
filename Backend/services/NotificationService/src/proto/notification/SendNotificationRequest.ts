// Original file: proto/notification.proto


export interface SendNotificationRequest {
  'userId'?: (string);
  'type'?: (string);
  'title'?: (string);
  'message'?: (string);
  'metadata'?: (string);
}

export interface SendNotificationRequest__Output {
  'userId': (string);
  'type': (string);
  'title': (string);
  'message': (string);
  'metadata': (string);
}
