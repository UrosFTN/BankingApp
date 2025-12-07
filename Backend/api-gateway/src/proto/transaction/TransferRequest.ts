// Original file: src/proto/transaction.proto


export interface TransferRequest {
  'fromAccountId'?: (string);
  'toAccountId'?: (string);
  'amount'?: (number | string);
  'currency'?: (string);
  'description'?: (string);
}

export interface TransferRequest__Output {
  'fromAccountId': (string);
  'toAccountId': (string);
  'amount': (number);
  'currency': (string);
  'description': (string);
}
