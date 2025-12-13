// Original file: src/proto/account.proto

import type { AccountType as _account_AccountType, AccountType__Output as _account_AccountType__Output } from '../account/AccountType';

export interface CreateAccountRequest {
  'userId'?: (number);
  'accountHolderName'?: (string);
  'accountType'?: (_account_AccountType);
  'currency'?: (string);
}

export interface CreateAccountRequest__Output {
  'userId': (number);
  'accountHolderName': (string);
  'accountType': (_account_AccountType__Output);
  'currency': (string);
}
