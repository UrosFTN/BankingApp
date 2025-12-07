// Original file: src/proto/account.proto

import type { Account as _account_Account, Account__Output as _account_Account__Output } from '../account/Account';

export interface TransferResponse {
  'success'?: (boolean);
  'message'?: (string);
  'fromAccount'?: (_account_Account | null);
  'toAccount'?: (_account_Account | null);
}

export interface TransferResponse__Output {
  'success': (boolean);
  'message': (string);
  'fromAccount': (_account_Account__Output | null);
  'toAccount': (_account_Account__Output | null);
}
