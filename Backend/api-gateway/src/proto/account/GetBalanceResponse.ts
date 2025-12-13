// Original file: src/proto/account.proto


export interface GetBalanceResponse {
  'success'?: (boolean);
  'message'?: (string);
  'balance'?: (number | string);
  'currency'?: (string);
}

export interface GetBalanceResponse__Output {
  'success': (boolean);
  'message': (string);
  'balance': (number);
  'currency': (string);
}
