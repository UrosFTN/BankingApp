// Original file: src/proto/transaction.proto


export interface CreateTransactionRequest {
  'senderAccountNumber'?: (string);
  'receiverAccountNumber'?: (string);
  'amount'?: (number | string);
  'currency'?: (string);
  'note'?: (string);
  'paymentCode'?: (string);
  'model'?: (string);
  'callNumber'?: (string);
}

export interface CreateTransactionRequest__Output {
  'senderAccountNumber': (string);
  'receiverAccountNumber': (string);
  'amount': (number);
  'currency': (string);
  'note': (string);
  'paymentCode': (string);
  'model': (string);
  'callNumber': (string);
}
