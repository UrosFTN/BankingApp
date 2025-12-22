// Original file: src/proto/transaction.proto


export interface WithdrawRequest {
  'accountNumber'?: (string);
  'amount'?: (number | string);
  'currency'?: (string);
  'note'?: (string);
}

export interface WithdrawRequest__Output {
  'accountNumber': (string);
  'amount': (number);
  'currency': (string);
  'note': (string);
}
