// Original file: src/proto/transaction.proto


export interface WithdrawRequest {
  'accountId'?: (string);
  'amount'?: (number | string);
  'currency'?: (string);
  'description'?: (string);
}

export interface WithdrawRequest__Output {
  'accountId': (string);
  'amount': (number);
  'currency': (string);
  'description': (string);
}
