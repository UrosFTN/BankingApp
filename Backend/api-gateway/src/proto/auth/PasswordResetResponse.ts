// Original file: src/proto/auth.proto


export interface PasswordResetResponse {
  'success'?: (boolean);
  'message'?: (string);
  'resetToken'?: (string);
}

export interface PasswordResetResponse__Output {
  'success': (boolean);
  'message': (string);
  'resetToken': (string);
}
