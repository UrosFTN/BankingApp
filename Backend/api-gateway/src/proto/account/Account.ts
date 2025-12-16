// Original file: src/proto/account.proto

import type { AccountType as _account_AccountType, AccountType__Output as _account_AccountType__Output } from '../account/AccountType';
import type { AccountStatus as _account_AccountStatus, AccountStatus__Output as _account_AccountStatus__Output } from '../account/AccountStatus';

export interface Account {
  'id'?: (string);
  'userId'?: (string);
  'accountNumber'?: (string);
  'iban'?: (string);
  'accountHolderName'?: (string);
  'accountType'?: (_account_AccountType);
  'balance'?: (number | string);
  'currency'?: (string);
  'status'?: (_account_AccountStatus);
  'createdAt'?: (string);
  'updatedAt'?: (string);
}

export interface Account__Output {
  'id': (string);
  'userId': (string);
  'accountNumber': (string);
  'iban': (string);
  'accountHolderName': (string);
  'accountType': (_account_AccountType__Output);
  'balance': (number);
  'currency': (string);
  'status': (_account_AccountStatus__Output);
  'createdAt': (string);
  'updatedAt': (string);
}
