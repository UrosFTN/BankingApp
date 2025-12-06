// Original file: proto/auth.proto


export interface ValidateTokenResponse {
  'valid'?: (boolean);
  'userId'?: (string);
  'email'?: (string);
  'role'?: (string);
  'message'?: (string);
}

export interface ValidateTokenResponse__Output {
  'valid': (boolean);
  'userId': (string);
  'email': (string);
  'role': (string);
  'message': (string);
}
