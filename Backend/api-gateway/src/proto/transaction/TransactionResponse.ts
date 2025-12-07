// Original file: src/proto/transaction.proto

import type { Transaction as _transaction_Transaction, Transaction__Output as _transaction_Transaction__Output } from '../transaction/Transaction';

export interface TransactionResponse {
  'success'?: (boolean);
  'message'?: (string);
  'transaction'?: (_transaction_Transaction | null);
}

export interface TransactionResponse__Output {
  'success': (boolean);
  'message': (string);
  'transaction': (_transaction_Transaction__Output | null);
}
