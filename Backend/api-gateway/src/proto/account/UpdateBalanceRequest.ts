// Original file: src/proto/account.proto


export interface UpdateBalanceRequest {
  'accountId'?: (number);
  'amount'?: (number | string);
  'transactionId'?: (string);
}

export interface UpdateBalanceRequest__Output {
  'accountId': (number);
  'amount': (number);
  'transactionId': (string);
}
