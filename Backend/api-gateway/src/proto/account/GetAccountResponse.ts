// Original file: src/proto/account.proto

import type { Account as _account_Account, Account__Output as _account_Account__Output } from '../account/Account';

export interface GetAccountResponse {
  'success'?: (boolean);
  'message'?: (string);
  'account'?: (_account_Account | null);
}

export interface GetAccountResponse__Output {
  'success': (boolean);
  'message': (string);
  'account': (_account_Account__Output | null);
}
