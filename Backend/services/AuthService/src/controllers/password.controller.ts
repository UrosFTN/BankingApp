import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import { passwordService } from "../services/password.service";
import { userService } from "../services/user.service";
import logger from "../utils/logger";

export class PasswordController {
  async requestPasswordReset(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { email } = call.request;

      const result = await passwordService.requestPasswordReset(email);

      callback(null, result);
    } catch (error: any) {
      logger.error(error, "Error in requestPasswordReset");
      callback({
        code: status.INTERNAL,
        message: error.message || "Password reset request failed",
      });
    }
  }

  async resetPassword(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { reset_token, new_password } = call.request;

      const result = await passwordService.resetPassword(
        reset_token,
        new_password,
      );

      callback(null, result);
    } catch (error: any) {
      logger.error(error, "Error in resetPassword");
      callback({
        code: status.INVALID_ARGUMENT,
        message: error.message || "Password reset failed",
      });
    }
  }

  async changePassword(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { user_id, old_password, new_password } = call.request;

      await userService.changePassword(user_id, old_password, new_password);

      callback(null, {
        success: true,
        message: "Password changed successfully",
      });
    } catch (error: any) {
      logger.error(error, "Error in changePassword");
      callback({
        code: status.INTERNAL,
        message: error.message || "Password change failed",
      });
    }
  }
}

export const passwordController = new PasswordController();
