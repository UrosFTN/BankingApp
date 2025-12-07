// Original file: proto/account.proto


export interface TransferRequest {
  'fromAccountId'?: (string);
  'toAccountId'?: (string);
  'amount'?: (number | string);
}

export interface TransferRequest__Output {
  'fromAccountId': (string);
  'toAccountId': (string);
  'amount': (number);
}
