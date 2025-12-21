import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { servicesConfig } from "../config";

const PROTO_PATH = path.join(__dirname, "../proto/transaction.proto");

const pkgDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const transactionPkg = (grpc.loadPackageDefinition(pkgDef) as any).transaction;

class TransactionGrpcClient {
  private client: any;

  constructor() {
    const { host, port } = servicesConfig.transaction;
    this.client = new transactionPkg.TransactionService(
      `${host}:${port}`,
      grpc.credentials.createInsecure(),
    );
  }

  private call<T = any>(method: string, data: any): Promise<T> {
    return new Promise((resolve, reject) => {
      this.client[method](data, (err: grpc.ServiceError, res: any) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
  }

  createTransaction(data: any) {
    return this.call("CreateTransaction", data);
  }

  getTransactionsByUser(data: any) {
    return this.call("GetTransactionsByUser", data);
  }
}

export const transactionClient = new TransactionGrpcClient();
