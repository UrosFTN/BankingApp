// Original file: src/proto/account.proto


export interface Account {
  'id'?: (string);
  'userId'?: (string);
  'currency'?: (string);
  'balance'?: (number | string);
  'status'?: (string);
  'createdAt'?: (string);
  'updatedAt'?: (string);
}

export interface Account__Output {
  'id': (string);
  'userId': (string);
  'currency': (string);
  'balance': (number);
  'status': (string);
  'createdAt': (string);
  'updatedAt': (string);
}
