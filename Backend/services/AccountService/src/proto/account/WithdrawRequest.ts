// Original file: proto/account.proto


export interface WithdrawRequest {
  'accountId'?: (string);
  'amount'?: (number | string);
}

export interface WithdrawRequest__Output {
  'accountId': (string);
  'amount': (number);
}
