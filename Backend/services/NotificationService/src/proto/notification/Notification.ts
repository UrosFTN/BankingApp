// Original file: proto/notification.proto


export interface Notification {
  'id'?: (string);
  'userId'?: (string);
  'type'?: (string);
  'title'?: (string);
  'message'?: (string);
  'metadata'?: (string);
  'isRead'?: (boolean);
  'createdAt'?: (string);
  'updatedAt'?: (string);
}

export interface Notification__Output {
  'id': (string);
  'userId': (string);
  'type': (string);
  'title': (string);
  'message': (string);
  'metadata': (string);
  'isRead': (boolean);
  'createdAt': (string);
  'updatedAt': (string);
}
