import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { servicesConfig } from "../config";

const PROTO_PATH = path.resolve(__dirname, "..", "proto", "transaction.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const transactionPackage = (
  grpc.loadPackageDefinition(packageDefinition) as any
).transaction;

class TransactionGrpcClient {
  private client: any;

  constructor() {
    const { host, port } = servicesConfig.transaction;
    const target = `${host}:${port}`;
    this.client = new transactionPackage.TransactionService(
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

  deposit(data: {
    account_id: string;
    amount: number;
    currency: string;
    description?: string;
  }) {
    return this.call("Deposit", data);
  }

  withdraw(data: {
    account_id: string;
    amount: number;
    currency: string;
    description?: string;
  }) {
    return this.call("Withdraw", data);
  }

  transfer(data: {
    from_account_id: string;
    to_account_id: string;
    amount: number;
    currency: string;
    description?: string;
  }) {
    return this.call("Transfer", data);
  }

  getTransaction(data: { transaction_id: string }) {
    return this.call("GetTransaction", data);
  }

  listTransactions(data: { account_id: string }) {
    return this.call("ListTransactions", data);
  }
}

export const transactionClient = new TransactionGrpcClient();
