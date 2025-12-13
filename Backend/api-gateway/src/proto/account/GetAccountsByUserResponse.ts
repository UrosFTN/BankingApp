// Original file: src/proto/account.proto

import type { Account as _account_Account, Account__Output as _account_Account__Output } from '../account/Account';

export interface GetAccountsByUserResponse {
  'success'?: (boolean);
  'message'?: (string);
  'accounts'?: (_account_Account)[];
}

export interface GetAccountsByUserResponse__Output {
  'success': (boolean);
  'message': (string);
  'accounts': (_account_Account__Output)[];
}
