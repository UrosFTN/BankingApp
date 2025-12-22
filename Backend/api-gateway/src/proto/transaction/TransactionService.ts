// Original file: src/proto/transaction.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateTransactionRequest as _transaction_CreateTransactionRequest, CreateTransactionRequest__Output as _transaction_CreateTransactionRequest__Output } from '../transaction/CreateTransactionRequest';
import type { CreateTransactionResponse as _transaction_CreateTransactionResponse, CreateTransactionResponse__Output as _transaction_CreateTransactionResponse__Output } from '../transaction/CreateTransactionResponse';
import type { DepositRequest as _transaction_DepositRequest, DepositRequest__Output as _transaction_DepositRequest__Output } from '../transaction/DepositRequest';
import type { DepositResponse as _transaction_DepositResponse, DepositResponse__Output as _transaction_DepositResponse__Output } from '../transaction/DepositResponse';
import type { GetTransactionsByUserRequest as _transaction_GetTransactionsByUserRequest, GetTransactionsByUserRequest__Output as _transaction_GetTransactionsByUserRequest__Output } from '../transaction/GetTransactionsByUserRequest';
import type { GetTransactionsByUserResponse as _transaction_GetTransactionsByUserResponse, GetTransactionsByUserResponse__Output as _transaction_GetTransactionsByUserResponse__Output } from '../transaction/GetTransactionsByUserResponse';
import type { WithdrawRequest as _transaction_WithdrawRequest, WithdrawRequest__Output as _transaction_WithdrawRequest__Output } from '../transaction/WithdrawRequest';
import type { WithdrawResponse as _transaction_WithdrawResponse, WithdrawResponse__Output as _transaction_WithdrawResponse__Output } from '../transaction/WithdrawResponse';

export interface TransactionServiceClient extends grpc.Client {
  CreateTransaction(argument: _transaction_CreateTransactionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_CreateTransactionResponse__Output>): grpc.ClientUnaryCall;
  CreateTransaction(argument: _transaction_CreateTransactionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_transaction_CreateTransactionResponse__Output>): grpc.ClientUnaryCall;
  CreateTransaction(argument: _transaction_CreateTransactionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_CreateTransactionResponse__Output>): grpc.ClientUnaryCall;
  CreateTransaction(argument: _transaction_CreateTransactionRequest, callback: grpc.requestCallback<_transaction_CreateTransactionResponse__Output>): grpc.ClientUnaryCall;
  createTransaction(argument: _transaction_CreateTransactionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_CreateTransactionResponse__Output>): grpc.ClientUnaryCall;
  createTransaction(argument: _transaction_CreateTransactionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_transaction_CreateTransactionResponse__Output>): grpc.ClientUnaryCall;
  createTransaction(argument: _transaction_CreateTransactionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_CreateTransactionResponse__Output>): grpc.ClientUnaryCall;
  createTransaction(argument: _transaction_CreateTransactionRequest, callback: grpc.requestCallback<_transaction_CreateTransactionResponse__Output>): grpc.ClientUnaryCall;
  
  Deposit(argument: _transaction_DepositRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_DepositResponse__Output>): grpc.ClientUnaryCall;
  Deposit(argument: _transaction_DepositRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_transaction_DepositResponse__Output>): grpc.ClientUnaryCall;
  Deposit(argument: _transaction_DepositRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_DepositResponse__Output>): grpc.ClientUnaryCall;
  Deposit(argument: _transaction_DepositRequest, callback: grpc.requestCallback<_transaction_DepositResponse__Output>): grpc.ClientUnaryCall;
  deposit(argument: _transaction_DepositRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_DepositResponse__Output>): grpc.ClientUnaryCall;
  deposit(argument: _transaction_DepositRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_transaction_DepositResponse__Output>): grpc.ClientUnaryCall;
  deposit(argument: _transaction_DepositRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_DepositResponse__Output>): grpc.ClientUnaryCall;
  deposit(argument: _transaction_DepositRequest, callback: grpc.requestCallback<_transaction_DepositResponse__Output>): grpc.ClientUnaryCall;
  
  GetTransactionsByUser(argument: _transaction_GetTransactionsByUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_GetTransactionsByUserResponse__Output>): grpc.ClientUnaryCall;
  GetTransactionsByUser(argument: _transaction_GetTransactionsByUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_transaction_GetTransactionsByUserResponse__Output>): grpc.ClientUnaryCall;
  GetTransactionsByUser(argument: _transaction_GetTransactionsByUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_GetTransactionsByUserResponse__Output>): grpc.ClientUnaryCall;
  GetTransactionsByUser(argument: _transaction_GetTransactionsByUserRequest, callback: grpc.requestCallback<_transaction_GetTransactionsByUserResponse__Output>): grpc.ClientUnaryCall;
  getTransactionsByUser(argument: _transaction_GetTransactionsByUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_GetTransactionsByUserResponse__Output>): grpc.ClientUnaryCall;
  getTransactionsByUser(argument: _transaction_GetTransactionsByUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_transaction_GetTransactionsByUserResponse__Output>): grpc.ClientUnaryCall;
  getTransactionsByUser(argument: _transaction_GetTransactionsByUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_GetTransactionsByUserResponse__Output>): grpc.ClientUnaryCall;
  getTransactionsByUser(argument: _transaction_GetTransactionsByUserRequest, callback: grpc.requestCallback<_transaction_GetTransactionsByUserResponse__Output>): grpc.ClientUnaryCall;
  
  Withdraw(argument: _transaction_WithdrawRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_WithdrawResponse__Output>): grpc.ClientUnaryCall;
  Withdraw(argument: _transaction_WithdrawRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_transaction_WithdrawResponse__Output>): grpc.ClientUnaryCall;
  Withdraw(argument: _transaction_WithdrawRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_WithdrawResponse__Output>): grpc.ClientUnaryCall;
  Withdraw(argument: _transaction_WithdrawRequest, callback: grpc.requestCallback<_transaction_WithdrawResponse__Output>): grpc.ClientUnaryCall;
  withdraw(argument: _transaction_WithdrawRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_WithdrawResponse__Output>): grpc.ClientUnaryCall;
  withdraw(argument: _transaction_WithdrawRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_transaction_WithdrawResponse__Output>): grpc.ClientUnaryCall;
  withdraw(argument: _transaction_WithdrawRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_WithdrawResponse__Output>): grpc.ClientUnaryCall;
  withdraw(argument: _transaction_WithdrawRequest, callback: grpc.requestCallback<_transaction_WithdrawResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface TransactionServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateTransaction: grpc.handleUnaryCall<_transaction_CreateTransactionRequest__Output, _transaction_CreateTransactionResponse>;
  
  Deposit: grpc.handleUnaryCall<_transaction_DepositRequest__Output, _transaction_DepositResponse>;
  
  GetTransactionsByUser: grpc.handleUnaryCall<_transaction_GetTransactionsByUserRequest__Output, _transaction_GetTransactionsByUserResponse>;
  
  Withdraw: grpc.handleUnaryCall<_transaction_WithdrawRequest__Output, _transaction_WithdrawResponse>;
  
}

export interface TransactionServiceDefinition extends grpc.ServiceDefinition {
  CreateTransaction: MethodDefinition<_transaction_CreateTransactionRequest, _transaction_CreateTransactionResponse, _transaction_CreateTransactionRequest__Output, _transaction_CreateTransactionResponse__Output>
  Deposit: MethodDefinition<_transaction_DepositRequest, _transaction_DepositResponse, _transaction_DepositRequest__Output, _transaction_DepositResponse__Output>
  GetTransactionsByUser: MethodDefinition<_transaction_GetTransactionsByUserRequest, _transaction_GetTransactionsByUserResponse, _transaction_GetTransactionsByUserRequest__Output, _transaction_GetTransactionsByUserResponse__Output>
  Withdraw: MethodDefinition<_transaction_WithdrawRequest, _transaction_WithdrawResponse, _transaction_WithdrawRequest__Output, _transaction_WithdrawResponse__Output>
}
