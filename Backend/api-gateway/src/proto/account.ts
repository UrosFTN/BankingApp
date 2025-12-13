import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { Account as _account_Account, Account__Output as _account_Account__Output } from './account/Account';
import type { AccountServiceClient as _account_AccountServiceClient, AccountServiceDefinition as _account_AccountServiceDefinition } from './account/AccountService';
import type { CreateAccountRequest as _account_CreateAccountRequest, CreateAccountRequest__Output as _account_CreateAccountRequest__Output } from './account/CreateAccountRequest';
import type { CreateAccountResponse as _account_CreateAccountResponse, CreateAccountResponse__Output as _account_CreateAccountResponse__Output } from './account/CreateAccountResponse';
import type { DeleteAccountRequest as _account_DeleteAccountRequest, DeleteAccountRequest__Output as _account_DeleteAccountRequest__Output } from './account/DeleteAccountRequest';
import type { DeleteAccountResponse as _account_DeleteAccountResponse, DeleteAccountResponse__Output as _account_DeleteAccountResponse__Output } from './account/DeleteAccountResponse';
import type { GetAccountRequest as _account_GetAccountRequest, GetAccountRequest__Output as _account_GetAccountRequest__Output } from './account/GetAccountRequest';
import type { GetAccountResponse as _account_GetAccountResponse, GetAccountResponse__Output as _account_GetAccountResponse__Output } from './account/GetAccountResponse';
import type { GetAccountsByUserRequest as _account_GetAccountsByUserRequest, GetAccountsByUserRequest__Output as _account_GetAccountsByUserRequest__Output } from './account/GetAccountsByUserRequest';
import type { GetAccountsByUserResponse as _account_GetAccountsByUserResponse, GetAccountsByUserResponse__Output as _account_GetAccountsByUserResponse__Output } from './account/GetAccountsByUserResponse';
import type { GetBalanceRequest as _account_GetBalanceRequest, GetBalanceRequest__Output as _account_GetBalanceRequest__Output } from './account/GetBalanceRequest';
import type { GetBalanceResponse as _account_GetBalanceResponse, GetBalanceResponse__Output as _account_GetBalanceResponse__Output } from './account/GetBalanceResponse';
import type { UpdateAccountRequest as _account_UpdateAccountRequest, UpdateAccountRequest__Output as _account_UpdateAccountRequest__Output } from './account/UpdateAccountRequest';
import type { UpdateAccountResponse as _account_UpdateAccountResponse, UpdateAccountResponse__Output as _account_UpdateAccountResponse__Output } from './account/UpdateAccountResponse';
import type { UpdateBalanceRequest as _account_UpdateBalanceRequest, UpdateBalanceRequest__Output as _account_UpdateBalanceRequest__Output } from './account/UpdateBalanceRequest';
import type { UpdateBalanceResponse as _account_UpdateBalanceResponse, UpdateBalanceResponse__Output as _account_UpdateBalanceResponse__Output } from './account/UpdateBalanceResponse';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  account: {
    Account: MessageTypeDefinition<_account_Account, _account_Account__Output>
    AccountService: SubtypeConstructor<typeof grpc.Client, _account_AccountServiceClient> & { service: _account_AccountServiceDefinition }
    AccountStatus: EnumTypeDefinition
    AccountType: EnumTypeDefinition
    CreateAccountRequest: MessageTypeDefinition<_account_CreateAccountRequest, _account_CreateAccountRequest__Output>
    CreateAccountResponse: MessageTypeDefinition<_account_CreateAccountResponse, _account_CreateAccountResponse__Output>
    DeleteAccountRequest: MessageTypeDefinition<_account_DeleteAccountRequest, _account_DeleteAccountRequest__Output>
    DeleteAccountResponse: MessageTypeDefinition<_account_DeleteAccountResponse, _account_DeleteAccountResponse__Output>
    GetAccountRequest: MessageTypeDefinition<_account_GetAccountRequest, _account_GetAccountRequest__Output>
    GetAccountResponse: MessageTypeDefinition<_account_GetAccountResponse, _account_GetAccountResponse__Output>
    GetAccountsByUserRequest: MessageTypeDefinition<_account_GetAccountsByUserRequest, _account_GetAccountsByUserRequest__Output>
    GetAccountsByUserResponse: MessageTypeDefinition<_account_GetAccountsByUserResponse, _account_GetAccountsByUserResponse__Output>
    GetBalanceRequest: MessageTypeDefinition<_account_GetBalanceRequest, _account_GetBalanceRequest__Output>
    GetBalanceResponse: MessageTypeDefinition<_account_GetBalanceResponse, _account_GetBalanceResponse__Output>
    UpdateAccountRequest: MessageTypeDefinition<_account_UpdateAccountRequest, _account_UpdateAccountRequest__Output>
    UpdateAccountResponse: MessageTypeDefinition<_account_UpdateAccountResponse, _account_UpdateAccountResponse__Output>
    UpdateBalanceRequest: MessageTypeDefinition<_account_UpdateBalanceRequest, _account_UpdateBalanceRequest__Output>
    UpdateBalanceResponse: MessageTypeDefinition<_account_UpdateBalanceResponse, _account_UpdateBalanceResponse__Output>
  }
}

