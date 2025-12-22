import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { servicesConfig } from "../config";

const PROTO_PATH = path.resolve(__dirname, "..", "proto", "auth.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const authPackage = (grpc.loadPackageDefinition(packageDefinition) as any).auth;

class AuthGrpcClient {
  private client: any;

  constructor() {
    const { host, port } = servicesConfig.auth;
    const target = `${host}:${port}`;
    this.client = new authPackage.AuthService(target, grpc.credentials.createInsecure());
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

  register(data: { email: string; password: string }) {
    return this.call("Register", data);
  }

  login(data: { email: string; password: string }) {
    return this.call("Login", data);
  }

  refreshToken(data: { refresh_token: string }) {
    return this.call("RefreshToken", data);
  }

  validateToken(data: { access_token: string }) {
    return this.call("ValidateToken", data);
  }

  logout(data: { user_id: string; refresh_token: string }) {
    return this.call("Logout", data);
  }

  revokeToken(data: { refresh_token: string }) {
    return this.call("RevokeToken", data);
  }

  requestPasswordReset(data: { email: string }) {
    return this.call("RequestPasswordReset", data);
  }

  resetPassword(data: { reset_token: string; new_password: string }) {
    return this.call("ResetPassword", data);
  }

  changePassword(data: { user_id: string; old_password: string; new_password: string }) {
    return this.call("ChangePassword", data);
  }
}

export const authClient = new AuthGrpcClient();
