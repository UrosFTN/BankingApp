// Original file: src/proto/account.proto

import type { AccountStatus as _account_AccountStatus, AccountStatus__Output as _account_AccountStatus__Output } from '../account/AccountStatus';

export interface UpdateAccountRequest {
  'accountId'?: (string);
  'userId'?: (string);
  'accountHolderName'?: (string);
  'status'?: (_account_AccountStatus);
  '_accountHolderName'?: "accountHolderName";
  '_status'?: "status";
}

export interface UpdateAccountRequest__Output {
  'accountId': (string);
  'userId': (string);
  'accountHolderName'?: (string);
  'status'?: (_account_AccountStatus__Output);
  '_accountHolderName'?: "accountHolderName";
  '_status'?: "status";
}
