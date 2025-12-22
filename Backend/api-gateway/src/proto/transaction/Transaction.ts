// Original file: src/proto/transaction.proto

import type { TransactionStatus as _transaction_TransactionStatus, TransactionStatus__Output as _transaction_TransactionStatus__Output } from '../transaction/TransactionStatus';
import type { TransactionType as _transaction_TransactionType, TransactionType__Output as _transaction_TransactionType__Output } from '../transaction/TransactionType';

export interface Transaction {
  'id'?: (string);
  'senderId'?: (string);
  'senderAccountId'?: (string);
  'senderAccountNumber'?: (string);
  'receiverId'?: (string);
  'receiverAccountId'?: (string);
  'receiverAccountNumber'?: (string);
  'amount'?: (number | string);
  'currency'?: (string);
  'status'?: (_transaction_TransactionStatus);
  'note'?: (string);
  'paymentCode'?: (string);
  'model'?: (string);
  'callNumber'?: (string);
  'createdAt'?: (string);
  'type'?: (_transaction_TransactionType);
}

export interface Transaction__Output {
  'id': (string);
  'senderId': (string);
  'senderAccountId': (string);
  'senderAccountNumber': (string);
  'receiverId': (string);
  'receiverAccountId': (string);
  'receiverAccountNumber': (string);
  'amount': (number);
  'currency': (string);
  'status': (_transaction_TransactionStatus__Output);
  'note': (string);
  'paymentCode': (string);
  'model': (string);
  'callNumber': (string);
  'createdAt': (string);
  'type': (_transaction_TransactionType__Output);
}
