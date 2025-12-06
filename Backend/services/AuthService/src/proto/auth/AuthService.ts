// Original file: proto/auth.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AuthResponse as _auth_AuthResponse, AuthResponse__Output as _auth_AuthResponse__Output } from '../auth/AuthResponse';
import type { ChangePasswordRequest as _auth_ChangePasswordRequest, ChangePasswordRequest__Output as _auth_ChangePasswordRequest__Output } from '../auth/ChangePasswordRequest';
import type { DeviceLoginRequest as _auth_DeviceLoginRequest, DeviceLoginRequest__Output as _auth_DeviceLoginRequest__Output } from '../auth/DeviceLoginRequest';
import type { EmptyResponse as _auth_EmptyResponse, EmptyResponse__Output as _auth_EmptyResponse__Output } from '../auth/EmptyResponse';
import type { GetUserDevicesRequest as _auth_GetUserDevicesRequest, GetUserDevicesRequest__Output as _auth_GetUserDevicesRequest__Output } from '../auth/GetUserDevicesRequest';
import type { GetUserDevicesResponse as _auth_GetUserDevicesResponse, GetUserDevicesResponse__Output as _auth_GetUserDevicesResponse__Output } from '../auth/GetUserDevicesResponse';
import type { LoginRequest as _auth_LoginRequest, LoginRequest__Output as _auth_LoginRequest__Output } from '../auth/LoginRequest';
import type { PasswordResetRequest as _auth_PasswordResetRequest, PasswordResetRequest__Output as _auth_PasswordResetRequest__Output } from '../auth/PasswordResetRequest';
import type { PasswordResetResponse as _auth_PasswordResetResponse, PasswordResetResponse__Output as _auth_PasswordResetResponse__Output } from '../auth/PasswordResetResponse';
import type { RefreshTokenRequest as _auth_RefreshTokenRequest, RefreshTokenRequest__Output as _auth_RefreshTokenRequest__Output } from '../auth/RefreshTokenRequest';
import type { RegisterDeviceRequest as _auth_RegisterDeviceRequest, RegisterDeviceRequest__Output as _auth_RegisterDeviceRequest__Output } from '../auth/RegisterDeviceRequest';
import type { RegisterDeviceResponse as _auth_RegisterDeviceResponse, RegisterDeviceResponse__Output as _auth_RegisterDeviceResponse__Output } from '../auth/RegisterDeviceResponse';
import type { RegisterRequest as _auth_RegisterRequest, RegisterRequest__Output as _auth_RegisterRequest__Output } from '../auth/RegisterRequest';
import type { ResetPasswordRequest as _auth_ResetPasswordRequest, ResetPasswordRequest__Output as _auth_ResetPasswordRequest__Output } from '../auth/ResetPasswordRequest';
import type { RevokeDeviceRequest as _auth_RevokeDeviceRequest, RevokeDeviceRequest__Output as _auth_RevokeDeviceRequest__Output } from '../auth/RevokeDeviceRequest';
import type { RevokeTokenRequest as _auth_RevokeTokenRequest, RevokeTokenRequest__Output as _auth_RevokeTokenRequest__Output } from '../auth/RevokeTokenRequest';
import type { ValidateTokenRequest as _auth_ValidateTokenRequest, ValidateTokenRequest__Output as _auth_ValidateTokenRequest__Output } from '../auth/ValidateTokenRequest';
import type { ValidateTokenResponse as _auth_ValidateTokenResponse, ValidateTokenResponse__Output as _auth_ValidateTokenResponse__Output } from '../auth/ValidateTokenResponse';

export interface AuthServiceClient extends grpc.Client {
  ChangePassword(argument: _auth_ChangePasswordRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  ChangePassword(argument: _auth_ChangePasswordRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  ChangePassword(argument: _auth_ChangePasswordRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  ChangePassword(argument: _auth_ChangePasswordRequest, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  changePassword(argument: _auth_ChangePasswordRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  changePassword(argument: _auth_ChangePasswordRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  changePassword(argument: _auth_ChangePasswordRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  changePassword(argument: _auth_ChangePasswordRequest, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  
  GetUserDevices(argument: _auth_GetUserDevicesRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_GetUserDevicesResponse__Output>): grpc.ClientUnaryCall;
  GetUserDevices(argument: _auth_GetUserDevicesRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_GetUserDevicesResponse__Output>): grpc.ClientUnaryCall;
  GetUserDevices(argument: _auth_GetUserDevicesRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_GetUserDevicesResponse__Output>): grpc.ClientUnaryCall;
  GetUserDevices(argument: _auth_GetUserDevicesRequest, callback: grpc.requestCallback<_auth_GetUserDevicesResponse__Output>): grpc.ClientUnaryCall;
  getUserDevices(argument: _auth_GetUserDevicesRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_GetUserDevicesResponse__Output>): grpc.ClientUnaryCall;
  getUserDevices(argument: _auth_GetUserDevicesRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_GetUserDevicesResponse__Output>): grpc.ClientUnaryCall;
  getUserDevices(argument: _auth_GetUserDevicesRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_GetUserDevicesResponse__Output>): grpc.ClientUnaryCall;
  getUserDevices(argument: _auth_GetUserDevicesRequest, callback: grpc.requestCallback<_auth_GetUserDevicesResponse__Output>): grpc.ClientUnaryCall;
  
  Login(argument: _auth_LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  Login(argument: _auth_LoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  Login(argument: _auth_LoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  Login(argument: _auth_LoginRequest, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_LoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_LoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_LoginRequest, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  
  LoginWithDevice(argument: _auth_DeviceLoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  LoginWithDevice(argument: _auth_DeviceLoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  LoginWithDevice(argument: _auth_DeviceLoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  LoginWithDevice(argument: _auth_DeviceLoginRequest, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  loginWithDevice(argument: _auth_DeviceLoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  loginWithDevice(argument: _auth_DeviceLoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  loginWithDevice(argument: _auth_DeviceLoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  loginWithDevice(argument: _auth_DeviceLoginRequest, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  
  RefreshToken(argument: _auth_RefreshTokenRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  RefreshToken(argument: _auth_RefreshTokenRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  RefreshToken(argument: _auth_RefreshTokenRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  RefreshToken(argument: _auth_RefreshTokenRequest, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  refreshToken(argument: _auth_RefreshTokenRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  refreshToken(argument: _auth_RefreshTokenRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  refreshToken(argument: _auth_RefreshTokenRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  refreshToken(argument: _auth_RefreshTokenRequest, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  
  Register(argument: _auth_RegisterRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  Register(argument: _auth_RegisterRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  Register(argument: _auth_RegisterRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  Register(argument: _auth_RegisterRequest, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _auth_RegisterRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _auth_RegisterRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _auth_RegisterRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _auth_RegisterRequest, callback: grpc.requestCallback<_auth_AuthResponse__Output>): grpc.ClientUnaryCall;
  
  RegisterDevice(argument: _auth_RegisterDeviceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_RegisterDeviceResponse__Output>): grpc.ClientUnaryCall;
  RegisterDevice(argument: _auth_RegisterDeviceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_RegisterDeviceResponse__Output>): grpc.ClientUnaryCall;
  RegisterDevice(argument: _auth_RegisterDeviceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_RegisterDeviceResponse__Output>): grpc.ClientUnaryCall;
  RegisterDevice(argument: _auth_RegisterDeviceRequest, callback: grpc.requestCallback<_auth_RegisterDeviceResponse__Output>): grpc.ClientUnaryCall;
  registerDevice(argument: _auth_RegisterDeviceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_RegisterDeviceResponse__Output>): grpc.ClientUnaryCall;
  registerDevice(argument: _auth_RegisterDeviceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_RegisterDeviceResponse__Output>): grpc.ClientUnaryCall;
  registerDevice(argument: _auth_RegisterDeviceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_RegisterDeviceResponse__Output>): grpc.ClientUnaryCall;
  registerDevice(argument: _auth_RegisterDeviceRequest, callback: grpc.requestCallback<_auth_RegisterDeviceResponse__Output>): grpc.ClientUnaryCall;
  
  RequestPasswordReset(argument: _auth_PasswordResetRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_PasswordResetResponse__Output>): grpc.ClientUnaryCall;
  RequestPasswordReset(argument: _auth_PasswordResetRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_PasswordResetResponse__Output>): grpc.ClientUnaryCall;
  RequestPasswordReset(argument: _auth_PasswordResetRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_PasswordResetResponse__Output>): grpc.ClientUnaryCall;
  RequestPasswordReset(argument: _auth_PasswordResetRequest, callback: grpc.requestCallback<_auth_PasswordResetResponse__Output>): grpc.ClientUnaryCall;
  requestPasswordReset(argument: _auth_PasswordResetRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_PasswordResetResponse__Output>): grpc.ClientUnaryCall;
  requestPasswordReset(argument: _auth_PasswordResetRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_PasswordResetResponse__Output>): grpc.ClientUnaryCall;
  requestPasswordReset(argument: _auth_PasswordResetRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_PasswordResetResponse__Output>): grpc.ClientUnaryCall;
  requestPasswordReset(argument: _auth_PasswordResetRequest, callback: grpc.requestCallback<_auth_PasswordResetResponse__Output>): grpc.ClientUnaryCall;
  
  ResetPassword(argument: _auth_ResetPasswordRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  ResetPassword(argument: _auth_ResetPasswordRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  ResetPassword(argument: _auth_ResetPasswordRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  ResetPassword(argument: _auth_ResetPasswordRequest, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  resetPassword(argument: _auth_ResetPasswordRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  resetPassword(argument: _auth_ResetPasswordRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  resetPassword(argument: _auth_ResetPasswordRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  resetPassword(argument: _auth_ResetPasswordRequest, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  
  RevokeDevice(argument: _auth_RevokeDeviceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  RevokeDevice(argument: _auth_RevokeDeviceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  RevokeDevice(argument: _auth_RevokeDeviceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  RevokeDevice(argument: _auth_RevokeDeviceRequest, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  revokeDevice(argument: _auth_RevokeDeviceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  revokeDevice(argument: _auth_RevokeDeviceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  revokeDevice(argument: _auth_RevokeDeviceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  revokeDevice(argument: _auth_RevokeDeviceRequest, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  
  RevokeToken(argument: _auth_RevokeTokenRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  RevokeToken(argument: _auth_RevokeTokenRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  RevokeToken(argument: _auth_RevokeTokenRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  RevokeToken(argument: _auth_RevokeTokenRequest, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  revokeToken(argument: _auth_RevokeTokenRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  revokeToken(argument: _auth_RevokeTokenRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  revokeToken(argument: _auth_RevokeTokenRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  revokeToken(argument: _auth_RevokeTokenRequest, callback: grpc.requestCallback<_auth_EmptyResponse__Output>): grpc.ClientUnaryCall;
  
  ValidateToken(argument: _auth_ValidateTokenRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  ValidateToken(argument: _auth_ValidateTokenRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  ValidateToken(argument: _auth_ValidateTokenRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  ValidateToken(argument: _auth_ValidateTokenRequest, callback: grpc.requestCallback<_auth_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  validateToken(argument: _auth_ValidateTokenRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  validateToken(argument: _auth_ValidateTokenRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  validateToken(argument: _auth_ValidateTokenRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  validateToken(argument: _auth_ValidateTokenRequest, callback: grpc.requestCallback<_auth_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface AuthServiceHandlers extends grpc.UntypedServiceImplementation {
  ChangePassword: grpc.handleUnaryCall<_auth_ChangePasswordRequest__Output, _auth_EmptyResponse>;
  
  GetUserDevices: grpc.handleUnaryCall<_auth_GetUserDevicesRequest__Output, _auth_GetUserDevicesResponse>;
  
  Login: grpc.handleUnaryCall<_auth_LoginRequest__Output, _auth_AuthResponse>;
  
  LoginWithDevice: grpc.handleUnaryCall<_auth_DeviceLoginRequest__Output, _auth_AuthResponse>;
  
  RefreshToken: grpc.handleUnaryCall<_auth_RefreshTokenRequest__Output, _auth_AuthResponse>;
  
  Register: grpc.handleUnaryCall<_auth_RegisterRequest__Output, _auth_AuthResponse>;
  
  RegisterDevice: grpc.handleUnaryCall<_auth_RegisterDeviceRequest__Output, _auth_RegisterDeviceResponse>;
  
  RequestPasswordReset: grpc.handleUnaryCall<_auth_PasswordResetRequest__Output, _auth_PasswordResetResponse>;
  
  ResetPassword: grpc.handleUnaryCall<_auth_ResetPasswordRequest__Output, _auth_EmptyResponse>;
  
  RevokeDevice: grpc.handleUnaryCall<_auth_RevokeDeviceRequest__Output, _auth_EmptyResponse>;
  
  RevokeToken: grpc.handleUnaryCall<_auth_RevokeTokenRequest__Output, _auth_EmptyResponse>;
  
  ValidateToken: grpc.handleUnaryCall<_auth_ValidateTokenRequest__Output, _auth_ValidateTokenResponse>;
  
}

export interface AuthServiceDefinition extends grpc.ServiceDefinition {
  ChangePassword: MethodDefinition<_auth_ChangePasswordRequest, _auth_EmptyResponse, _auth_ChangePasswordRequest__Output, _auth_EmptyResponse__Output>
  GetUserDevices: MethodDefinition<_auth_GetUserDevicesRequest, _auth_GetUserDevicesResponse, _auth_GetUserDevicesRequest__Output, _auth_GetUserDevicesResponse__Output>
  Login: MethodDefinition<_auth_LoginRequest, _auth_AuthResponse, _auth_LoginRequest__Output, _auth_AuthResponse__Output>
  LoginWithDevice: MethodDefinition<_auth_DeviceLoginRequest, _auth_AuthResponse, _auth_DeviceLoginRequest__Output, _auth_AuthResponse__Output>
  RefreshToken: MethodDefinition<_auth_RefreshTokenRequest, _auth_AuthResponse, _auth_RefreshTokenRequest__Output, _auth_AuthResponse__Output>
  Register: MethodDefinition<_auth_RegisterRequest, _auth_AuthResponse, _auth_RegisterRequest__Output, _auth_AuthResponse__Output>
  RegisterDevice: MethodDefinition<_auth_RegisterDeviceRequest, _auth_RegisterDeviceResponse, _auth_RegisterDeviceRequest__Output, _auth_RegisterDeviceResponse__Output>
  RequestPasswordReset: MethodDefinition<_auth_PasswordResetRequest, _auth_PasswordResetResponse, _auth_PasswordResetRequest__Output, _auth_PasswordResetResponse__Output>
  ResetPassword: MethodDefinition<_auth_ResetPasswordRequest, _auth_EmptyResponse, _auth_ResetPasswordRequest__Output, _auth_EmptyResponse__Output>
  RevokeDevice: MethodDefinition<_auth_RevokeDeviceRequest, _auth_EmptyResponse, _auth_RevokeDeviceRequest__Output, _auth_EmptyResponse__Output>
  RevokeToken: MethodDefinition<_auth_RevokeTokenRequest, _auth_EmptyResponse, _auth_RevokeTokenRequest__Output, _auth_EmptyResponse__Output>
  ValidateToken: MethodDefinition<_auth_ValidateTokenRequest, _auth_ValidateTokenResponse, _auth_ValidateTokenRequest__Output, _auth_ValidateTokenResponse__Output>
}
