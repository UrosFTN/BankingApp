import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { DepositRequest as _transaction_DepositRequest, DepositRequest__Output as _transaction_DepositRequest__Output } from './transaction/DepositRequest';
import type { GetTransactionRequest as _transaction_GetTransactionRequest, GetTransactionRequest__Output as _transaction_GetTransactionRequest__Output } from './transaction/GetTransactionRequest';
import type { ListTransactionsRequest as _transaction_ListTransactionsRequest, ListTransactionsRequest__Output as _transaction_ListTransactionsRequest__Output } from './transaction/ListTransactionsRequest';
import type { ListTransactionsResponse as _transaction_ListTransactionsResponse, ListTransactionsResponse__Output as _transaction_ListTransactionsResponse__Output } from './transaction/ListTransactionsResponse';
import type { Transaction as _transaction_Transaction, Transaction__Output as _transaction_Transaction__Output } from './transaction/Transaction';
import type { TransactionResponse as _transaction_TransactionResponse, TransactionResponse__Output as _transaction_TransactionResponse__Output } from './transaction/TransactionResponse';
import type { TransactionServiceClient as _transaction_TransactionServiceClient, TransactionServiceDefinition as _transaction_TransactionServiceDefinition } from './transaction/TransactionService';
import type { TransferRequest as _transaction_TransferRequest, TransferRequest__Output as _transaction_TransferRequest__Output } from './transaction/TransferRequest';
import type { WithdrawRequest as _transaction_WithdrawRequest, WithdrawRequest__Output as _transaction_WithdrawRequest__Output } from './transaction/WithdrawRequest';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  transaction: {
    DepositRequest: MessageTypeDefinition<_transaction_DepositRequest, _transaction_DepositRequest__Output>
    GetTransactionRequest: MessageTypeDefinition<_transaction_GetTransactionRequest, _transaction_GetTransactionRequest__Output>
    ListTransactionsRequest: MessageTypeDefinition<_transaction_ListTransactionsRequest, _transaction_ListTransactionsRequest__Output>
    ListTransactionsResponse: MessageTypeDefinition<_transaction_ListTransactionsResponse, _transaction_ListTransactionsResponse__Output>
    Transaction: MessageTypeDefinition<_transaction_Transaction, _transaction_Transaction__Output>
    TransactionResponse: MessageTypeDefinition<_transaction_TransactionResponse, _transaction_TransactionResponse__Output>
    TransactionService: SubtypeConstructor<typeof grpc.Client, _transaction_TransactionServiceClient> & { service: _transaction_TransactionServiceDefinition }
    TransferRequest: MessageTypeDefinition<_transaction_TransferRequest, _transaction_TransferRequest__Output>
    WithdrawRequest: MessageTypeDefinition<_transaction_WithdrawRequest, _transaction_WithdrawRequest__Output>
  }
}

