import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { servicesConfig } from "../config";

const PROTO_PATH = path.join(__dirname, "../proto/account.proto");

const accountPackageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const accountPackage = (grpc.loadPackageDefinition(accountPackageDef) as any)
  .account;

type GrpcCallback<T> = (err: grpc.ServiceError | null, response: T) => void;

export interface CreateAccountRequest {
  user_id: string;
  account_holder_name: string;
  account_type: number;
  currency: string;
}

export interface CreateAccountResponse {
  success: boolean;
  message: string;
  account?: Account;
}

export interface GetAccountRequest {
  account_id: string;
  user_id: string;
}

export interface GetAccountResponse {
  success: boolean;
  message: string;
  account?: Account;
}

export interface GetAccountsByUserRequest {
  user_id: string;
}

export interface GetAccountsByUserResponse {
  success: boolean;
  message: string;
  accounts: Account[];
}

export interface DeleteAccountRequest {
  account_id: string;
  user_id: string;
}

export interface DeleteAccountResponse {
  success: boolean;
  message: string;
}

export interface Account {
  id: string;
  user_id: string;
  account_number: string;
  iban: string;
  account_holder_name: string;
  account_type: number;
  balance: number;
  currency: string;
  status: number;
  created_at: string;
  updated_at: string;
}

class AccountGrpcClient {
  private client: any;

  constructor() {
    const { host, port } = servicesConfig.account;
    const target = `${host}:${port}`;
    this.client = new accountPackage.AccountService(
      target,
      grpc.credentials.createInsecure(),
    );
  }

  private call(method: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client[method](data, (err: grpc.ServiceError, response: any) => {
        if (err) {
          return reject(err);
        }
        resolve(response);
      });
    });
  }

  createAccount(data: CreateAccountRequest) {
    return this.call("CreateAccount", data);
  }

  getAccount(data: GetAccountRequest) {
    return this.call("GetAccount", data);
  }

  getAccountsByUser(data: GetAccountsByUserRequest) {
    return this.call("GetAccountsByUser", data);
  }

  deleteAccount(data: DeleteAccountRequest) {
    return this.call("DeleteAccount", data);
  }
}

export const accountClient = new AccountGrpcClient();
