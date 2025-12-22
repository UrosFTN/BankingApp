// Original file: src/proto/transaction.proto

import type { Transaction as _transaction_Transaction, Transaction__Output as _transaction_Transaction__Output } from '../transaction/Transaction';

export interface DepositResponse {
  'transaction'?: (_transaction_Transaction | null);
}

export interface DepositResponse__Output {
  'transaction': (_transaction_Transaction__Output | null);
}
