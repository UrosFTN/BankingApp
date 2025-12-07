// Original file: proto/account.proto

import type { Account as _account_Account, Account__Output as _account_Account__Output } from '../account/Account';

export interface AccountResponse {
  'success'?: (boolean);
  'message'?: (string);
  'account'?: (_account_Account | null);
}

export interface AccountResponse__Output {
  'success': (boolean);
  'message': (string);
  'account': (_account_Account__Output | null);
}
