import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AuthResponse as _auth_AuthResponse, AuthResponse__Output as _auth_AuthResponse__Output } from './auth/AuthResponse';
import type { AuthServiceClient as _auth_AuthServiceClient, AuthServiceDefinition as _auth_AuthServiceDefinition } from './auth/AuthService';
import type { ChangePasswordRequest as _auth_ChangePasswordRequest, ChangePasswordRequest__Output as _auth_ChangePasswordRequest__Output } from './auth/ChangePasswordRequest';
import type { EmptyResponse as _auth_EmptyResponse, EmptyResponse__Output as _auth_EmptyResponse__Output } from './auth/EmptyResponse';
import type { LoginRequest as _auth_LoginRequest, LoginRequest__Output as _auth_LoginRequest__Output } from './auth/LoginRequest';
import type { PasswordResetRequest as _auth_PasswordResetRequest, PasswordResetRequest__Output as _auth_PasswordResetRequest__Output } from './auth/PasswordResetRequest';
import type { PasswordResetResponse as _auth_PasswordResetResponse, PasswordResetResponse__Output as _auth_PasswordResetResponse__Output } from './auth/PasswordResetResponse';
import type { RefreshTokenRequest as _auth_RefreshTokenRequest, RefreshTokenRequest__Output as _auth_RefreshTokenRequest__Output } from './auth/RefreshTokenRequest';
import type { RegisterRequest as _auth_RegisterRequest, RegisterRequest__Output as _auth_RegisterRequest__Output } from './auth/RegisterRequest';
import type { ResetPasswordRequest as _auth_ResetPasswordRequest, ResetPasswordRequest__Output as _auth_ResetPasswordRequest__Output } from './auth/ResetPasswordRequest';
import type { RevokeTokenRequest as _auth_RevokeTokenRequest, RevokeTokenRequest__Output as _auth_RevokeTokenRequest__Output } from './auth/RevokeTokenRequest';
import type { ValidateTokenRequest as _auth_ValidateTokenRequest, ValidateTokenRequest__Output as _auth_ValidateTokenRequest__Output } from './auth/ValidateTokenRequest';
import type { ValidateTokenResponse as _auth_ValidateTokenResponse, ValidateTokenResponse__Output as _auth_ValidateTokenResponse__Output } from './auth/ValidateTokenResponse';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  auth: {
    AuthResponse: MessageTypeDefinition<_auth_AuthResponse, _auth_AuthResponse__Output>
    AuthService: SubtypeConstructor<typeof grpc.Client, _auth_AuthServiceClient> & { service: _auth_AuthServiceDefinition }
    ChangePasswordRequest: MessageTypeDefinition<_auth_ChangePasswordRequest, _auth_ChangePasswordRequest__Output>
    EmptyResponse: MessageTypeDefinition<_auth_EmptyResponse, _auth_EmptyResponse__Output>
    LoginRequest: MessageTypeDefinition<_auth_LoginRequest, _auth_LoginRequest__Output>
    PasswordResetRequest: MessageTypeDefinition<_auth_PasswordResetRequest, _auth_PasswordResetRequest__Output>
    PasswordResetResponse: MessageTypeDefinition<_auth_PasswordResetResponse, _auth_PasswordResetResponse__Output>
    RefreshTokenRequest: MessageTypeDefinition<_auth_RefreshTokenRequest, _auth_RefreshTokenRequest__Output>
    RegisterRequest: MessageTypeDefinition<_auth_RegisterRequest, _auth_RegisterRequest__Output>
    ResetPasswordRequest: MessageTypeDefinition<_auth_ResetPasswordRequest, _auth_ResetPasswordRequest__Output>
    RevokeTokenRequest: MessageTypeDefinition<_auth_RevokeTokenRequest, _auth_RevokeTokenRequest__Output>
    ValidateTokenRequest: MessageTypeDefinition<_auth_ValidateTokenRequest, _auth_ValidateTokenRequest__Output>
    ValidateTokenResponse: MessageTypeDefinition<_auth_ValidateTokenResponse, _auth_ValidateTokenResponse__Output>
  }
}

