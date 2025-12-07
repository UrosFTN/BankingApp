// Original file: src/proto/transaction.proto


export interface DepositRequest {
  'accountId'?: (string);
  'amount'?: (number | string);
  'currency'?: (string);
  'description'?: (string);
}

export interface DepositRequest__Output {
  'accountId': (string);
  'amount': (number);
  'currency': (string);
  'description': (string);
}
