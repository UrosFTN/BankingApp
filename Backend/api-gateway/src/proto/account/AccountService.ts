// Original file: src/proto/account.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateAccountRequest as _account_CreateAccountRequest, CreateAccountRequest__Output as _account_CreateAccountRequest__Output } from '../account/CreateAccountRequest';
import type { CreateAccountResponse as _account_CreateAccountResponse, CreateAccountResponse__Output as _account_CreateAccountResponse__Output } from '../account/CreateAccountResponse';
import type { DeleteAccountRequest as _account_DeleteAccountRequest, DeleteAccountRequest__Output as _account_DeleteAccountRequest__Output } from '../account/DeleteAccountRequest';
import type { DeleteAccountResponse as _account_DeleteAccountResponse, DeleteAccountResponse__Output as _account_DeleteAccountResponse__Output } from '../account/DeleteAccountResponse';
import type { GetAccountRequest as _account_GetAccountRequest, GetAccountRequest__Output as _account_GetAccountRequest__Output } from '../account/GetAccountRequest';
import type { GetAccountResponse as _account_GetAccountResponse, GetAccountResponse__Output as _account_GetAccountResponse__Output } from '../account/GetAccountResponse';
import type { GetAccountsByUserRequest as _account_GetAccountsByUserRequest, GetAccountsByUserRequest__Output as _account_GetAccountsByUserRequest__Output } from '../account/GetAccountsByUserRequest';
import type { GetAccountsByUserResponse as _account_GetAccountsByUserResponse, GetAccountsByUserResponse__Output as _account_GetAccountsByUserResponse__Output } from '../account/GetAccountsByUserResponse';
import type { GetBalanceRequest as _account_GetBalanceRequest, GetBalanceRequest__Output as _account_GetBalanceRequest__Output } from '../account/GetBalanceRequest';
import type { GetBalanceResponse as _account_GetBalanceResponse, GetBalanceResponse__Output as _account_GetBalanceResponse__Output } from '../account/GetBalanceResponse';
import type { UpdateAccountRequest as _account_UpdateAccountRequest, UpdateAccountRequest__Output as _account_UpdateAccountRequest__Output } from '../account/UpdateAccountRequest';
import type { UpdateAccountResponse as _account_UpdateAccountResponse, UpdateAccountResponse__Output as _account_UpdateAccountResponse__Output } from '../account/UpdateAccountResponse';
import type { UpdateBalanceRequest as _account_UpdateBalanceRequest, UpdateBalanceRequest__Output as _account_UpdateBalanceRequest__Output } from '../account/UpdateBalanceRequest';
import type { UpdateBalanceResponse as _account_UpdateBalanceResponse, UpdateBalanceResponse__Output as _account_UpdateBalanceResponse__Output } from '../account/UpdateBalanceResponse';

export interface AccountServiceClient extends grpc.Client {
  CreateAccount(argument: _account_CreateAccountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_CreateAccountResponse__Output>): grpc.ClientUnaryCall;
  CreateAccount(argument: _account_CreateAccountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_CreateAccountResponse__Output>): grpc.ClientUnaryCall;
  CreateAccount(argument: _account_CreateAccountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_CreateAccountResponse__Output>): grpc.ClientUnaryCall;
  CreateAccount(argument: _account_CreateAccountRequest, callback: grpc.requestCallback<_account_CreateAccountResponse__Output>): grpc.ClientUnaryCall;
  createAccount(argument: _account_CreateAccountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_CreateAccountResponse__Output>): grpc.ClientUnaryCall;
  createAccount(argument: _account_CreateAccountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_CreateAccountResponse__Output>): grpc.ClientUnaryCall;
  createAccount(argument: _account_CreateAccountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_CreateAccountResponse__Output>): grpc.ClientUnaryCall;
  createAccount(argument: _account_CreateAccountRequest, callback: grpc.requestCallback<_account_CreateAccountResponse__Output>): grpc.ClientUnaryCall;
  
  DeleteAccount(argument: _account_DeleteAccountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_DeleteAccountResponse__Output>): grpc.ClientUnaryCall;
  DeleteAccount(argument: _account_DeleteAccountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_DeleteAccountResponse__Output>): grpc.ClientUnaryCall;
  DeleteAccount(argument: _account_DeleteAccountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_DeleteAccountResponse__Output>): grpc.ClientUnaryCall;
  DeleteAccount(argument: _account_DeleteAccountRequest, callback: grpc.requestCallback<_account_DeleteAccountResponse__Output>): grpc.ClientUnaryCall;
  deleteAccount(argument: _account_DeleteAccountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_DeleteAccountResponse__Output>): grpc.ClientUnaryCall;
  deleteAccount(argument: _account_DeleteAccountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_DeleteAccountResponse__Output>): grpc.ClientUnaryCall;
  deleteAccount(argument: _account_DeleteAccountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_DeleteAccountResponse__Output>): grpc.ClientUnaryCall;
  deleteAccount(argument: _account_DeleteAccountRequest, callback: grpc.requestCallback<_account_DeleteAccountResponse__Output>): grpc.ClientUnaryCall;
  
  GetAccount(argument: _account_GetAccountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_GetAccountResponse__Output>): grpc.ClientUnaryCall;
  GetAccount(argument: _account_GetAccountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_GetAccountResponse__Output>): grpc.ClientUnaryCall;
  GetAccount(argument: _account_GetAccountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_GetAccountResponse__Output>): grpc.ClientUnaryCall;
  GetAccount(argument: _account_GetAccountRequest, callback: grpc.requestCallback<_account_GetAccountResponse__Output>): grpc.ClientUnaryCall;
  getAccount(argument: _account_GetAccountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_GetAccountResponse__Output>): grpc.ClientUnaryCall;
  getAccount(argument: _account_GetAccountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_GetAccountResponse__Output>): grpc.ClientUnaryCall;
  getAccount(argument: _account_GetAccountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_GetAccountResponse__Output>): grpc.ClientUnaryCall;
  getAccount(argument: _account_GetAccountRequest, callback: grpc.requestCallback<_account_GetAccountResponse__Output>): grpc.ClientUnaryCall;
  
  GetAccountsByUser(argument: _account_GetAccountsByUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_GetAccountsByUserResponse__Output>): grpc.ClientUnaryCall;
  GetAccountsByUser(argument: _account_GetAccountsByUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_GetAccountsByUserResponse__Output>): grpc.ClientUnaryCall;
  GetAccountsByUser(argument: _account_GetAccountsByUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_GetAccountsByUserResponse__Output>): grpc.ClientUnaryCall;
  GetAccountsByUser(argument: _account_GetAccountsByUserRequest, callback: grpc.requestCallback<_account_GetAccountsByUserResponse__Output>): grpc.ClientUnaryCall;
  getAccountsByUser(argument: _account_GetAccountsByUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_GetAccountsByUserResponse__Output>): grpc.ClientUnaryCall;
  getAccountsByUser(argument: _account_GetAccountsByUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_GetAccountsByUserResponse__Output>): grpc.ClientUnaryCall;
  getAccountsByUser(argument: _account_GetAccountsByUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_GetAccountsByUserResponse__Output>): grpc.ClientUnaryCall;
  getAccountsByUser(argument: _account_GetAccountsByUserRequest, callback: grpc.requestCallback<_account_GetAccountsByUserResponse__Output>): grpc.ClientUnaryCall;
  
  GetBalance(argument: _account_GetBalanceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_GetBalanceResponse__Output>): grpc.ClientUnaryCall;
  GetBalance(argument: _account_GetBalanceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_GetBalanceResponse__Output>): grpc.ClientUnaryCall;
  GetBalance(argument: _account_GetBalanceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_GetBalanceResponse__Output>): grpc.ClientUnaryCall;
  GetBalance(argument: _account_GetBalanceRequest, callback: grpc.requestCallback<_account_GetBalanceResponse__Output>): grpc.ClientUnaryCall;
  getBalance(argument: _account_GetBalanceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_GetBalanceResponse__Output>): grpc.ClientUnaryCall;
  getBalance(argument: _account_GetBalanceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_GetBalanceResponse__Output>): grpc.ClientUnaryCall;
  getBalance(argument: _account_GetBalanceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_GetBalanceResponse__Output>): grpc.ClientUnaryCall;
  getBalance(argument: _account_GetBalanceRequest, callback: grpc.requestCallback<_account_GetBalanceResponse__Output>): grpc.ClientUnaryCall;
  
  UpdateAccount(argument: _account_UpdateAccountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_UpdateAccountResponse__Output>): grpc.ClientUnaryCall;
  UpdateAccount(argument: _account_UpdateAccountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_UpdateAccountResponse__Output>): grpc.ClientUnaryCall;
  UpdateAccount(argument: _account_UpdateAccountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_UpdateAccountResponse__Output>): grpc.ClientUnaryCall;
  UpdateAccount(argument: _account_UpdateAccountRequest, callback: grpc.requestCallback<_account_UpdateAccountResponse__Output>): grpc.ClientUnaryCall;
  updateAccount(argument: _account_UpdateAccountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_UpdateAccountResponse__Output>): grpc.ClientUnaryCall;
  updateAccount(argument: _account_UpdateAccountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_UpdateAccountResponse__Output>): grpc.ClientUnaryCall;
  updateAccount(argument: _account_UpdateAccountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_UpdateAccountResponse__Output>): grpc.ClientUnaryCall;
  updateAccount(argument: _account_UpdateAccountRequest, callback: grpc.requestCallback<_account_UpdateAccountResponse__Output>): grpc.ClientUnaryCall;
  
  UpdateBalance(argument: _account_UpdateBalanceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_UpdateBalanceResponse__Output>): grpc.ClientUnaryCall;
  UpdateBalance(argument: _account_UpdateBalanceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_UpdateBalanceResponse__Output>): grpc.ClientUnaryCall;
  UpdateBalance(argument: _account_UpdateBalanceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_UpdateBalanceResponse__Output>): grpc.ClientUnaryCall;
  UpdateBalance(argument: _account_UpdateBalanceRequest, callback: grpc.requestCallback<_account_UpdateBalanceResponse__Output>): grpc.ClientUnaryCall;
  updateBalance(argument: _account_UpdateBalanceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_UpdateBalanceResponse__Output>): grpc.ClientUnaryCall;
  updateBalance(argument: _account_UpdateBalanceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_UpdateBalanceResponse__Output>): grpc.ClientUnaryCall;
  updateBalance(argument: _account_UpdateBalanceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_UpdateBalanceResponse__Output>): grpc.ClientUnaryCall;
  updateBalance(argument: _account_UpdateBalanceRequest, callback: grpc.requestCallback<_account_UpdateBalanceResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface AccountServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateAccount: grpc.handleUnaryCall<_account_CreateAccountRequest__Output, _account_CreateAccountResponse>;
  
  DeleteAccount: grpc.handleUnaryCall<_account_DeleteAccountRequest__Output, _account_DeleteAccountResponse>;
  
  GetAccount: grpc.handleUnaryCall<_account_GetAccountRequest__Output, _account_GetAccountResponse>;
  
  GetAccountsByUser: grpc.handleUnaryCall<_account_GetAccountsByUserRequest__Output, _account_GetAccountsByUserResponse>;
  
  GetBalance: grpc.handleUnaryCall<_account_GetBalanceRequest__Output, _account_GetBalanceResponse>;
  
  UpdateAccount: grpc.handleUnaryCall<_account_UpdateAccountRequest__Output, _account_UpdateAccountResponse>;
  
  UpdateBalance: grpc.handleUnaryCall<_account_UpdateBalanceRequest__Output, _account_UpdateBalanceResponse>;
  
}

export interface AccountServiceDefinition extends grpc.ServiceDefinition {
  CreateAccount: MethodDefinition<_account_CreateAccountRequest, _account_CreateAccountResponse, _account_CreateAccountRequest__Output, _account_CreateAccountResponse__Output>
  DeleteAccount: MethodDefinition<_account_DeleteAccountRequest, _account_DeleteAccountResponse, _account_DeleteAccountRequest__Output, _account_DeleteAccountResponse__Output>
  GetAccount: MethodDefinition<_account_GetAccountRequest, _account_GetAccountResponse, _account_GetAccountRequest__Output, _account_GetAccountResponse__Output>
  GetAccountsByUser: MethodDefinition<_account_GetAccountsByUserRequest, _account_GetAccountsByUserResponse, _account_GetAccountsByUserRequest__Output, _account_GetAccountsByUserResponse__Output>
  GetBalance: MethodDefinition<_account_GetBalanceRequest, _account_GetBalanceResponse, _account_GetBalanceRequest__Output, _account_GetBalanceResponse__Output>
  UpdateAccount: MethodDefinition<_account_UpdateAccountRequest, _account_UpdateAccountResponse, _account_UpdateAccountRequest__Output, _account_UpdateAccountResponse__Output>
  UpdateBalance: MethodDefinition<_account_UpdateBalanceRequest, _account_UpdateBalanceResponse, _account_UpdateBalanceRequest__Output, _account_UpdateBalanceResponse__Output>
}
