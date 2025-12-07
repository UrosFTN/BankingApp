// Original file: src/proto/transaction.proto

import type { Transaction as _transaction_Transaction, Transaction__Output as _transaction_Transaction__Output } from '../transaction/Transaction';

export interface ListTransactionsResponse {
  'transactions'?: (_transaction_Transaction)[];
}

export interface ListTransactionsResponse__Output {
  'transactions': (_transaction_Transaction__Output)[];
}
