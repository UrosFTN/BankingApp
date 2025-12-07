import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import { authService } from "../services/auth.service";
import logger from "../utils/logger";

export class AuthController {
  async register(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { email, password } = call.request;

      const result = await authService.register(email, password);

      callback(null, result);
    } catch (error: any) {
      logger.error(error, "Error in register");
      callback({
        code: status.INTERNAL,
        message: error.message || "Registration failed",
      });
    }
  }

  async login(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { email, password } = call.request;

      const result = await authService.login(email, password);

      callback(null, result);
    } catch (error: any) {
      logger.error(error, "Error in login");
      callback({
        code: status.UNAUTHENTICATED,
        message: error.message || "Login failed",
      });
    }
  }

  async refreshToken(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { refresh_token } = call.request;

      const result = await authService.refreshToken(refresh_token);

      callback(null, result);
    } catch (error: any) {
      logger.error(error, "Error in refreshToken");
      callback({
        code: status.UNAUTHENTICATED,
        message: error.message || "Token refresh failed",
      });
    }
  }

  async validateToken(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { access_token } = call.request;

      const result = await authService.validateToken(access_token);

      callback(null, result);
    } catch (error: any) {
      logger.error(error, "Error in validateToken");
      callback({
        code: status.UNAUTHENTICATED,
        message: error.message || "Token validation failed",
      });
    }
  }

  async logout(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { user_id, refresh_token } = call.request;

      const result = await authService.logout(user_id, refresh_token);

      callback(null, result);
    } catch (error: any) {
      logger.error(error, "Error in logout");
      callback({
        code: status.INTERNAL,
        message: error.message || "Logout failed",
      });
    }
  }
}

export const authController = new AuthController();
