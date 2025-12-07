// Original file: src/proto/auth.proto


export interface ChangePasswordRequest {
  'userId'?: (string);
  'oldPassword'?: (string);
  'newPassword'?: (string);
}

export interface ChangePasswordRequest__Output {
  'userId': (string);
  'oldPassword': (string);
  'newPassword': (string);
}
