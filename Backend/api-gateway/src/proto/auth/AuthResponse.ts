// Original file: src/proto/auth.proto


export interface AuthResponse {
  'success'?: (boolean);
  'message'?: (string);
  'userId'?: (string);
  'email'?: (string);
  'role'?: (string);
  'accessToken'?: (string);
  'refreshToken'?: (string);
}

export interface AuthResponse__Output {
  'success': (boolean);
  'message': (string);
  'userId': (string);
  'email': (string);
  'role': (string);
  'accessToken': (string);
  'refreshToken': (string);
}
