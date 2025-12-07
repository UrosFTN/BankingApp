// Original file: src/proto/transaction.proto


export interface Transaction {
  'id'?: (string);
  'type'?: (string);
  'fromAccountId'?: (string);
  'toAccountId'?: (string);
  'amount'?: (number | string);
  'currency'?: (string);
  'status'?: (string);
  'description'?: (string);
  'createdAt'?: (string);
  'updatedAt'?: (string);
}

export interface Transaction__Output {
  'id': (string);
  'type': (string);
  'fromAccountId': (string);
  'toAccountId': (string);
  'amount': (number);
  'currency': (string);
  'status': (string);
  'description': (string);
  'createdAt': (string);
  'updatedAt': (string);
}
