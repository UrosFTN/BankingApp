import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { Account as _account_Account, Account__Output as _account_Account__Output } from './account/Account';
import type { AccountResponse as _account_AccountResponse, AccountResponse__Output as _account_AccountResponse__Output } from './account/AccountResponse';
import type { AccountServiceClient as _account_AccountServiceClient, AccountServiceDefinition as _account_AccountServiceDefinition } from './account/AccountService';
import type { CreateAccountRequest as _account_CreateAccountRequest, CreateAccountRequest__Output as _account_CreateAccountRequest__Output } from './account/CreateAccountRequest';
import type { DepositRequest as _account_DepositRequest, DepositRequest__Output as _account_DepositRequest__Output } from './account/DepositRequest';
import type { GetAccountRequest as _account_GetAccountRequest, GetAccountRequest__Output as _account_GetAccountRequest__Output } from './account/GetAccountRequest';
import type { ListAccountsRequest as _account_ListAccountsRequest, ListAccountsRequest__Output as _account_ListAccountsRequest__Output } from './account/ListAccountsRequest';
import type { ListAccountsResponse as _account_ListAccountsResponse, ListAccountsResponse__Output as _account_ListAccountsResponse__Output } from './account/ListAccountsResponse';
import type { TransferRequest as _account_TransferRequest, TransferRequest__Output as _account_TransferRequest__Output } from './account/TransferRequest';
import type { TransferResponse as _account_TransferResponse, TransferResponse__Output as _account_TransferResponse__Output } from './account/TransferResponse';
import type { WithdrawRequest as _account_WithdrawRequest, WithdrawRequest__Output as _account_WithdrawRequest__Output } from './account/WithdrawRequest';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  account: {
    Account: MessageTypeDefinition<_account_Account, _account_Account__Output>
    AccountResponse: MessageTypeDefinition<_account_AccountResponse, _account_AccountResponse__Output>
    AccountService: SubtypeConstructor<typeof grpc.Client, _account_AccountServiceClient> & { service: _account_AccountServiceDefinition }
    CreateAccountRequest: MessageTypeDefinition<_account_CreateAccountRequest, _account_CreateAccountRequest__Output>
    DepositRequest: MessageTypeDefinition<_account_DepositRequest, _account_DepositRequest__Output>
    GetAccountRequest: MessageTypeDefinition<_account_GetAccountRequest, _account_GetAccountRequest__Output>
    ListAccountsRequest: MessageTypeDefinition<_account_ListAccountsRequest, _account_ListAccountsRequest__Output>
    ListAccountsResponse: MessageTypeDefinition<_account_ListAccountsResponse, _account_ListAccountsResponse__Output>
    TransferRequest: MessageTypeDefinition<_account_TransferRequest, _account_TransferRequest__Output>
    TransferResponse: MessageTypeDefinition<_account_TransferResponse, _account_TransferResponse__Output>
    WithdrawRequest: MessageTypeDefinition<_account_WithdrawRequest, _account_WithdrawRequest__Output>
  }
}

