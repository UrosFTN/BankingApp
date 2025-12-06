// Original file: proto/auth.proto


export interface ResetPasswordRequest {
  'resetToken'?: (string);
  'newPassword'?: (string);
}

export interface ResetPasswordRequest__Output {
  'resetToken': (string);
  'newPassword': (string);
}
