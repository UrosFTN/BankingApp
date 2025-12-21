import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { CreateTransactionRequest as _transaction_CreateTransactionRequest, CreateTransactionRequest__Output as _transaction_CreateTransactionRequest__Output } from './transaction/CreateTransactionRequest';
import type { CreateTransactionResponse as _transaction_CreateTransactionResponse, CreateTransactionResponse__Output as _transaction_CreateTransactionResponse__Output } from './transaction/CreateTransactionResponse';
import type { GetTransactionsByUserRequest as _transaction_GetTransactionsByUserRequest, GetTransactionsByUserRequest__Output as _transaction_GetTransactionsByUserRequest__Output } from './transaction/GetTransactionsByUserRequest';
import type { GetTransactionsByUserResponse as _transaction_GetTransactionsByUserResponse, GetTransactionsByUserResponse__Output as _transaction_GetTransactionsByUserResponse__Output } from './transaction/GetTransactionsByUserResponse';
import type { Transaction as _transaction_Transaction, Transaction__Output as _transaction_Transaction__Output } from './transaction/Transaction';
import type { TransactionServiceClient as _transaction_TransactionServiceClient, TransactionServiceDefinition as _transaction_TransactionServiceDefinition } from './transaction/TransactionService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  transaction: {
    CreateTransactionRequest: MessageTypeDefinition<_transaction_CreateTransactionRequest, _transaction_CreateTransactionRequest__Output>
    CreateTransactionResponse: MessageTypeDefinition<_transaction_CreateTransactionResponse, _transaction_CreateTransactionResponse__Output>
    GetTransactionsByUserRequest: MessageTypeDefinition<_transaction_GetTransactionsByUserRequest, _transaction_GetTransactionsByUserRequest__Output>
    GetTransactionsByUserResponse: MessageTypeDefinition<_transaction_GetTransactionsByUserResponse, _transaction_GetTransactionsByUserResponse__Output>
    Transaction: MessageTypeDefinition<_transaction_Transaction, _transaction_Transaction__Output>
    TransactionService: SubtypeConstructor<typeof grpc.Client, _transaction_TransactionServiceClient> & { service: _transaction_TransactionServiceDefinition }
    TransactionStatus: EnumTypeDefinition
  }
}

