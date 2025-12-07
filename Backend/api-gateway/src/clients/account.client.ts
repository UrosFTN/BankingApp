import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { servicesConfig } from "../config";

const PROTO_PATH = path.resolve(__dirname, "..", "proto", "account.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const accountPackage = (grpc.loadPackageDefinition(packageDefinition) as any)
  .account;

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

  createAccount(data: { user_id: string; currency: string }) {
    return this.call("CreateAccount", data);
  }

  getAccount(data: { account_id: string }) {
    return this.call("GetAccount", data);
  }

  listAccounts(data: { user_id: string }) {
    return this.call("ListAccounts", data);
  }

  deposit(data: { account_id: string; amount: number }) {
    return this.call("Deposit", data);
  }

  withdraw(data: { account_id: string; amount: number }) {
    return this.call("Withdraw", data);
  }

  transfer(data: {
    from_account_id: string;
    to_account_id: string;
    amount: number;
  }) {
    return this.call("Transfer", data);
  }
}

export const accountClient = new AccountGrpcClient();
