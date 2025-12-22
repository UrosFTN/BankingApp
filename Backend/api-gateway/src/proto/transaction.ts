import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { CreateTransactionRequest as _transaction_CreateTransactionRequest, CreateTransactionRequest__Output as _transaction_CreateTransactionRequest__Output } from './transaction/CreateTransactionRequest';
import type { CreateTransactionResponse as _transaction_CreateTransactionResponse, CreateTransactionResponse__Output as _transaction_CreateTransactionResponse__Output } from './transaction/CreateTransactionResponse';
import type { DepositRequest as _transaction_DepositRequest, DepositRequest__Output as _transaction_DepositRequest__Output } from './transaction/DepositRequest';
import type { DepositResponse as _transaction_DepositResponse, DepositResponse__Output as _transaction_DepositResponse__Output } from './transaction/DepositResponse';
import type { GetTransactionsByUserRequest as _transaction_GetTransactionsByUserRequest, GetTransactionsByUserRequest__Output as _transaction_GetTransactionsByUserRequest__Output } from './transaction/GetTransactionsByUserRequest';
import type { GetTransactionsByUserResponse as _transaction_GetTransactionsByUserResponse, GetTransactionsByUserResponse__Output as _transaction_GetTransactionsByUserResponse__Output } from './transaction/GetTransactionsByUserResponse';
import type { Transaction as _transaction_Transaction, Transaction__Output as _transaction_Transaction__Output } from './transaction/Transaction';
import type { TransactionServiceClient as _transaction_TransactionServiceClient, TransactionServiceDefinition as _transaction_TransactionServiceDefinition } from './transaction/TransactionService';
import type { WithdrawRequest as _transaction_WithdrawRequest, WithdrawRequest__Output as _transaction_WithdrawRequest__Output } from './transaction/WithdrawRequest';
import type { WithdrawResponse as _transaction_WithdrawResponse, WithdrawResponse__Output as _transaction_WithdrawResponse__Output } from './transaction/WithdrawResponse';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  transaction: {
    CreateTransactionRequest: MessageTypeDefinition<_transaction_CreateTransactionRequest, _transaction_CreateTransactionRequest__Output>
    CreateTransactionResponse: MessageTypeDefinition<_transaction_CreateTransactionResponse, _transaction_CreateTransactionResponse__Output>
    DepositRequest: MessageTypeDefinition<_transaction_DepositRequest, _transaction_DepositRequest__Output>
    DepositResponse: MessageTypeDefinition<_transaction_DepositResponse, _transaction_DepositResponse__Output>
    GetTransactionsByUserRequest: MessageTypeDefinition<_transaction_GetTransactionsByUserRequest, _transaction_GetTransactionsByUserRequest__Output>
    GetTransactionsByUserResponse: MessageTypeDefinition<_transaction_GetTransactionsByUserResponse, _transaction_GetTransactionsByUserResponse__Output>
    Transaction: MessageTypeDefinition<_transaction_Transaction, _transaction_Transaction__Output>
    TransactionService: SubtypeConstructor<typeof grpc.Client, _transaction_TransactionServiceClient> & { service: _transaction_TransactionServiceDefinition }
    TransactionStatus: EnumTypeDefinition
    TransactionType: EnumTypeDefinition
    WithdrawRequest: MessageTypeDefinition<_transaction_WithdrawRequest, _transaction_WithdrawRequest__Output>
    WithdrawResponse: MessageTypeDefinition<_transaction_WithdrawResponse, _transaction_WithdrawResponse__Output>
  }
}

