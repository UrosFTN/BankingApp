// Original file: src/proto/account.proto


export interface UpdateBalanceRequest {
  'accountId'?: (string);
  'amount'?: (number | string);
  'transactionId'?: (string);
}

export interface UpdateBalanceRequest__Output {
  'accountId': (string);
  'amount': (number);
  'transactionId': (string);
}
