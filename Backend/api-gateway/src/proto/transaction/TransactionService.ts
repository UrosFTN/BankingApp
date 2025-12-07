// Original file: src/proto/transaction.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { DepositRequest as _transaction_DepositRequest, DepositRequest__Output as _transaction_DepositRequest__Output } from '../transaction/DepositRequest';
import type { GetTransactionRequest as _transaction_GetTransactionRequest, GetTransactionRequest__Output as _transaction_GetTransactionRequest__Output } from '../transaction/GetTransactionRequest';
import type { ListTransactionsRequest as _transaction_ListTransactionsRequest, ListTransactionsRequest__Output as _transaction_ListTransactionsRequest__Output } from '../transaction/ListTransactionsRequest';
import type { ListTransactionsResponse as _transaction_ListTransactionsResponse, ListTransactionsResponse__Output as _transaction_ListTransactionsResponse__Output } from '../transaction/ListTransactionsResponse';
import type { TransactionResponse as _transaction_TransactionResponse, TransactionResponse__Output as _transaction_TransactionResponse__Output } from '../transaction/TransactionResponse';
import type { TransferRequest as _transaction_TransferRequest, TransferRequest__Output as _transaction_TransferRequest__Output } from '../transaction/TransferRequest';
import type { WithdrawRequest as _transaction_WithdrawRequest, WithdrawRequest__Output as _transaction_WithdrawRequest__Output } from '../transaction/WithdrawRequest';

export interface TransactionServiceClient extends grpc.Client {
  Deposit(argument: _transaction_DepositRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  Deposit(argument: _transaction_DepositRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  Deposit(argument: _transaction_DepositRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  Deposit(argument: _transaction_DepositRequest, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  deposit(argument: _transaction_DepositRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  deposit(argument: _transaction_DepositRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  deposit(argument: _transaction_DepositRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  deposit(argument: _transaction_DepositRequest, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  
  GetTransaction(argument: _transaction_GetTransactionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  GetTransaction(argument: _transaction_GetTransactionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  GetTransaction(argument: _transaction_GetTransactionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  GetTransaction(argument: _transaction_GetTransactionRequest, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  getTransaction(argument: _transaction_GetTransactionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  getTransaction(argument: _transaction_GetTransactionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  getTransaction(argument: _transaction_GetTransactionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  getTransaction(argument: _transaction_GetTransactionRequest, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  
  ListTransactions(argument: _transaction_ListTransactionsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_ListTransactionsResponse__Output>): grpc.ClientUnaryCall;
  ListTransactions(argument: _transaction_ListTransactionsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_transaction_ListTransactionsResponse__Output>): grpc.ClientUnaryCall;
  ListTransactions(argument: _transaction_ListTransactionsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_ListTransactionsResponse__Output>): grpc.ClientUnaryCall;
  ListTransactions(argument: _transaction_ListTransactionsRequest, callback: grpc.requestCallback<_transaction_ListTransactionsResponse__Output>): grpc.ClientUnaryCall;
  listTransactions(argument: _transaction_ListTransactionsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_ListTransactionsResponse__Output>): grpc.ClientUnaryCall;
  listTransactions(argument: _transaction_ListTransactionsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_transaction_ListTransactionsResponse__Output>): grpc.ClientUnaryCall;
  listTransactions(argument: _transaction_ListTransactionsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_ListTransactionsResponse__Output>): grpc.ClientUnaryCall;
  listTransactions(argument: _transaction_ListTransactionsRequest, callback: grpc.requestCallback<_transaction_ListTransactionsResponse__Output>): grpc.ClientUnaryCall;
  
  Transfer(argument: _transaction_TransferRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  Transfer(argument: _transaction_TransferRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  Transfer(argument: _transaction_TransferRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  Transfer(argument: _transaction_TransferRequest, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  transfer(argument: _transaction_TransferRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  transfer(argument: _transaction_TransferRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  transfer(argument: _transaction_TransferRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  transfer(argument: _transaction_TransferRequest, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  
  Withdraw(argument: _transaction_WithdrawRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  Withdraw(argument: _transaction_WithdrawRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  Withdraw(argument: _transaction_WithdrawRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  Withdraw(argument: _transaction_WithdrawRequest, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  withdraw(argument: _transaction_WithdrawRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  withdraw(argument: _transaction_WithdrawRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  withdraw(argument: _transaction_WithdrawRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  withdraw(argument: _transaction_WithdrawRequest, callback: grpc.requestCallback<_transaction_TransactionResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface TransactionServiceHandlers extends grpc.UntypedServiceImplementation {
  Deposit: grpc.handleUnaryCall<_transaction_DepositRequest__Output, _transaction_TransactionResponse>;
  
  GetTransaction: grpc.handleUnaryCall<_transaction_GetTransactionRequest__Output, _transaction_TransactionResponse>;
  
  ListTransactions: grpc.handleUnaryCall<_transaction_ListTransactionsRequest__Output, _transaction_ListTransactionsResponse>;
  
  Transfer: grpc.handleUnaryCall<_transaction_TransferRequest__Output, _transaction_TransactionResponse>;
  
  Withdraw: grpc.handleUnaryCall<_transaction_WithdrawRequest__Output, _transaction_TransactionResponse>;
  
}

export interface TransactionServiceDefinition extends grpc.ServiceDefinition {
  Deposit: MethodDefinition<_transaction_DepositRequest, _transaction_TransactionResponse, _transaction_DepositRequest__Output, _transaction_TransactionResponse__Output>
  GetTransaction: MethodDefinition<_transaction_GetTransactionRequest, _transaction_TransactionResponse, _transaction_GetTransactionRequest__Output, _transaction_TransactionResponse__Output>
  ListTransactions: MethodDefinition<_transaction_ListTransactionsRequest, _transaction_ListTransactionsResponse, _transaction_ListTransactionsRequest__Output, _transaction_ListTransactionsResponse__Output>
  Transfer: MethodDefinition<_transaction_TransferRequest, _transaction_TransactionResponse, _transaction_TransferRequest__Output, _transaction_TransactionResponse__Output>
  Withdraw: MethodDefinition<_transaction_WithdrawRequest, _transaction_TransactionResponse, _transaction_WithdrawRequest__Output, _transaction_TransactionResponse__Output>
}
