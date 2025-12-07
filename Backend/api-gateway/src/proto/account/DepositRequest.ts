// Original file: src/proto/account.proto


export interface DepositRequest {
  'accountId'?: (string);
  'amount'?: (number | string);
}

export interface DepositRequest__Output {
  'accountId': (string);
  'amount': (number);
}
