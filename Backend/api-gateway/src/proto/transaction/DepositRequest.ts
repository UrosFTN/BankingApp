// Original file: src/proto/transaction.proto


export interface DepositRequest {
  'accountNumber'?: (string);
  'amount'?: (number | string);
  'currency'?: (string);
  'note'?: (string);
}

export interface DepositRequest__Output {
  'accountNumber': (string);
  'amount': (number);
  'currency': (string);
  'note': (string);
}
