// Original file: src/proto/account.proto


export interface UpdateBalanceResponse {
  'success'?: (boolean);
  'message'?: (string);
  'newBalance'?: (number | string);
}

export interface UpdateBalanceResponse__Output {
  'success': (boolean);
  'message': (string);
  'newBalance': (number);
}
