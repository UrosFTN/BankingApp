// Original file: src/proto/transaction.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateTransactionRequest as _transaction_CreateTransactionRequest, CreateTransactionRequest__Output as _transaction_CreateTransactionRequest__Output } from '../transaction/CreateTransactionRequest';
import type { CreateTransactionResponse as _transaction_CreateTransactionResponse, CreateTransactionResponse__Output as _transaction_CreateTransactionResponse__Output } from '../transaction/CreateTransactionResponse';
import type { GetTransactionsByUserRequest as _transaction_GetTransactionsByUserRequest, GetTransactionsByUserRequest__Output as _transaction_GetTransactionsByUserRequest__Output } from '../transaction/GetTransactionsByUserRequest';
import type { GetTransactionsByUserResponse as _transaction_GetTransactionsByUserResponse, GetTransactionsByUserResponse__Output as _transaction_GetTransactionsByUserResponse__Output } from '../transaction/GetTransactionsByUserResponse';

export interface TransactionServiceClient extends grpc.Client {
  CreateTransaction(argument: _transaction_CreateTransactionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_CreateTransactionResponse__Output>): grpc.ClientUnaryCall;
  CreateTransaction(argument: _transaction_CreateTransactionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_transaction_CreateTransactionResponse__Output>): grpc.ClientUnaryCall;
  CreateTransaction(argument: _transaction_CreateTransactionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_CreateTransactionResponse__Output>): grpc.ClientUnaryCall;
  CreateTransaction(argument: _transaction_CreateTransactionRequest, callback: grpc.requestCallback<_transaction_CreateTransactionResponse__Output>): grpc.ClientUnaryCall;
  createTransaction(argument: _transaction_CreateTransactionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_CreateTransactionResponse__Output>): grpc.ClientUnaryCall;
  createTransaction(argument: _transaction_CreateTransactionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_transaction_CreateTransactionResponse__Output>): grpc.ClientUnaryCall;
  createTransaction(argument: _transaction_CreateTransactionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_CreateTransactionResponse__Output>): grpc.ClientUnaryCall;
  createTransaction(argument: _transaction_CreateTransactionRequest, callback: grpc.requestCallback<_transaction_CreateTransactionResponse__Output>): grpc.ClientUnaryCall;
  
  GetTransactionsByUser(argument: _transaction_GetTransactionsByUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_GetTransactionsByUserResponse__Output>): grpc.ClientUnaryCall;
  GetTransactionsByUser(argument: _transaction_GetTransactionsByUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_transaction_GetTransactionsByUserResponse__Output>): grpc.ClientUnaryCall;
  GetTransactionsByUser(argument: _transaction_GetTransactionsByUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_GetTransactionsByUserResponse__Output>): grpc.ClientUnaryCall;
  GetTransactionsByUser(argument: _transaction_GetTransactionsByUserRequest, callback: grpc.requestCallback<_transaction_GetTransactionsByUserResponse__Output>): grpc.ClientUnaryCall;
  getTransactionsByUser(argument: _transaction_GetTransactionsByUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_GetTransactionsByUserResponse__Output>): grpc.ClientUnaryCall;
  getTransactionsByUser(argument: _transaction_GetTransactionsByUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_transaction_GetTransactionsByUserResponse__Output>): grpc.ClientUnaryCall;
  getTransactionsByUser(argument: _transaction_GetTransactionsByUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_GetTransactionsByUserResponse__Output>): grpc.ClientUnaryCall;
  getTransactionsByUser(argument: _transaction_GetTransactionsByUserRequest, callback: grpc.requestCallback<_transaction_GetTransactionsByUserResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface TransactionServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateTransaction: grpc.handleUnaryCall<_transaction_CreateTransactionRequest__Output, _transaction_CreateTransactionResponse>;
  
  GetTransactionsByUser: grpc.handleUnaryCall<_transaction_GetTransactionsByUserRequest__Output, _transaction_GetTransactionsByUserResponse>;
  
}

export interface TransactionServiceDefinition extends grpc.ServiceDefinition {
  CreateTransaction: MethodDefinition<_transaction_CreateTransactionRequest, _transaction_CreateTransactionResponse, _transaction_CreateTransactionRequest__Output, _transaction_CreateTransactionResponse__Output>
  GetTransactionsByUser: MethodDefinition<_transaction_GetTransactionsByUserRequest, _transaction_GetTransactionsByUserResponse, _transaction_GetTransactionsByUserRequest__Output, _transaction_GetTransactionsByUserResponse__Output>
}
