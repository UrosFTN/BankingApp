// Original file: src/proto/account.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AccountResponse as _account_AccountResponse, AccountResponse__Output as _account_AccountResponse__Output } from '../account/AccountResponse';
import type { CreateAccountRequest as _account_CreateAccountRequest, CreateAccountRequest__Output as _account_CreateAccountRequest__Output } from '../account/CreateAccountRequest';
import type { DepositRequest as _account_DepositRequest, DepositRequest__Output as _account_DepositRequest__Output } from '../account/DepositRequest';
import type { GetAccountRequest as _account_GetAccountRequest, GetAccountRequest__Output as _account_GetAccountRequest__Output } from '../account/GetAccountRequest';
import type { ListAccountsRequest as _account_ListAccountsRequest, ListAccountsRequest__Output as _account_ListAccountsRequest__Output } from '../account/ListAccountsRequest';
import type { ListAccountsResponse as _account_ListAccountsResponse, ListAccountsResponse__Output as _account_ListAccountsResponse__Output } from '../account/ListAccountsResponse';
import type { TransferRequest as _account_TransferRequest, TransferRequest__Output as _account_TransferRequest__Output } from '../account/TransferRequest';
import type { TransferResponse as _account_TransferResponse, TransferResponse__Output as _account_TransferResponse__Output } from '../account/TransferResponse';
import type { WithdrawRequest as _account_WithdrawRequest, WithdrawRequest__Output as _account_WithdrawRequest__Output } from '../account/WithdrawRequest';

export interface AccountServiceClient extends grpc.Client {
  CreateAccount(argument: _account_CreateAccountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  CreateAccount(argument: _account_CreateAccountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  CreateAccount(argument: _account_CreateAccountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  CreateAccount(argument: _account_CreateAccountRequest, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  createAccount(argument: _account_CreateAccountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  createAccount(argument: _account_CreateAccountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  createAccount(argument: _account_CreateAccountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  createAccount(argument: _account_CreateAccountRequest, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  
  Deposit(argument: _account_DepositRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  Deposit(argument: _account_DepositRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  Deposit(argument: _account_DepositRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  Deposit(argument: _account_DepositRequest, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  deposit(argument: _account_DepositRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  deposit(argument: _account_DepositRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  deposit(argument: _account_DepositRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  deposit(argument: _account_DepositRequest, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  
  GetAccount(argument: _account_GetAccountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  GetAccount(argument: _account_GetAccountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  GetAccount(argument: _account_GetAccountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  GetAccount(argument: _account_GetAccountRequest, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  getAccount(argument: _account_GetAccountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  getAccount(argument: _account_GetAccountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  getAccount(argument: _account_GetAccountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  getAccount(argument: _account_GetAccountRequest, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  
  ListAccounts(argument: _account_ListAccountsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_ListAccountsResponse__Output>): grpc.ClientUnaryCall;
  ListAccounts(argument: _account_ListAccountsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_ListAccountsResponse__Output>): grpc.ClientUnaryCall;
  ListAccounts(argument: _account_ListAccountsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_ListAccountsResponse__Output>): grpc.ClientUnaryCall;
  ListAccounts(argument: _account_ListAccountsRequest, callback: grpc.requestCallback<_account_ListAccountsResponse__Output>): grpc.ClientUnaryCall;
  listAccounts(argument: _account_ListAccountsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_ListAccountsResponse__Output>): grpc.ClientUnaryCall;
  listAccounts(argument: _account_ListAccountsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_ListAccountsResponse__Output>): grpc.ClientUnaryCall;
  listAccounts(argument: _account_ListAccountsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_ListAccountsResponse__Output>): grpc.ClientUnaryCall;
  listAccounts(argument: _account_ListAccountsRequest, callback: grpc.requestCallback<_account_ListAccountsResponse__Output>): grpc.ClientUnaryCall;
  
  Transfer(argument: _account_TransferRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_TransferResponse__Output>): grpc.ClientUnaryCall;
  Transfer(argument: _account_TransferRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_TransferResponse__Output>): grpc.ClientUnaryCall;
  Transfer(argument: _account_TransferRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_TransferResponse__Output>): grpc.ClientUnaryCall;
  Transfer(argument: _account_TransferRequest, callback: grpc.requestCallback<_account_TransferResponse__Output>): grpc.ClientUnaryCall;
  transfer(argument: _account_TransferRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_TransferResponse__Output>): grpc.ClientUnaryCall;
  transfer(argument: _account_TransferRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_TransferResponse__Output>): grpc.ClientUnaryCall;
  transfer(argument: _account_TransferRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_TransferResponse__Output>): grpc.ClientUnaryCall;
  transfer(argument: _account_TransferRequest, callback: grpc.requestCallback<_account_TransferResponse__Output>): grpc.ClientUnaryCall;
  
  Withdraw(argument: _account_WithdrawRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  Withdraw(argument: _account_WithdrawRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  Withdraw(argument: _account_WithdrawRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  Withdraw(argument: _account_WithdrawRequest, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  withdraw(argument: _account_WithdrawRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  withdraw(argument: _account_WithdrawRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  withdraw(argument: _account_WithdrawRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  withdraw(argument: _account_WithdrawRequest, callback: grpc.requestCallback<_account_AccountResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface AccountServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateAccount: grpc.handleUnaryCall<_account_CreateAccountRequest__Output, _account_AccountResponse>;
  
  Deposit: grpc.handleUnaryCall<_account_DepositRequest__Output, _account_AccountResponse>;
  
  GetAccount: grpc.handleUnaryCall<_account_GetAccountRequest__Output, _account_AccountResponse>;
  
  ListAccounts: grpc.handleUnaryCall<_account_ListAccountsRequest__Output, _account_ListAccountsResponse>;
  
  Transfer: grpc.handleUnaryCall<_account_TransferRequest__Output, _account_TransferResponse>;
  
  Withdraw: grpc.handleUnaryCall<_account_WithdrawRequest__Output, _account_AccountResponse>;
  
}

export interface AccountServiceDefinition extends grpc.ServiceDefinition {
  CreateAccount: MethodDefinition<_account_CreateAccountRequest, _account_AccountResponse, _account_CreateAccountRequest__Output, _account_AccountResponse__Output>
  Deposit: MethodDefinition<_account_DepositRequest, _account_AccountResponse, _account_DepositRequest__Output, _account_AccountResponse__Output>
  GetAccount: MethodDefinition<_account_GetAccountRequest, _account_AccountResponse, _account_GetAccountRequest__Output, _account_AccountResponse__Output>
  ListAccounts: MethodDefinition<_account_ListAccountsRequest, _account_ListAccountsResponse, _account_ListAccountsRequest__Output, _account_ListAccountsResponse__Output>
  Transfer: MethodDefinition<_account_TransferRequest, _account_TransferResponse, _account_TransferRequest__Output, _account_TransferResponse__Output>
  Withdraw: MethodDefinition<_account_WithdrawRequest, _account_AccountResponse, _account_WithdrawRequest__Output, _account_AccountResponse__Output>
}
