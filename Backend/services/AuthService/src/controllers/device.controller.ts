import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import { deviceService } from "../services/device.service";
import logger from "../utils/logger";

export class DeviceController {
  async registerDevice(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { user_id, device_id, device_name } = call.request;

      const result = await deviceService.registerDevice(
        user_id,
        device_id,
        device_name,
      );

      callback(null, result);
    } catch (error: any) {
      logger.error(error, "Error in registerDevice");
      callback({
        code: status.INTERNAL,
        message: error.message || "Device registration failed",
      });
    }
  }

  async loginWithDevice(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { device_token } = call.request;

      const result = await deviceService.authenticateWithDevice(device_token);

      callback(null, result);
    } catch (error: any) {
      logger.error(error, "Error in loginWithDevice");
      callback({
        code: status.UNAUTHENTICATED,
        message: error.message || "Device authentication failed",
      });
    }
  }

  async getUserDevices(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { user_id } = call.request;

      const result = await deviceService.getUserDevices(user_id);

      callback(null, result);
    } catch (error: any) {
      logger.error(error, "Error in getUserDevices");
      callback({
        code: status.INTERNAL,
        message: error.message || "Failed to retrieve devices",
      });
    }
  }

  async revokeDevice(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { user_id, device_id } = call.request;

      const result = await deviceService.revokeDevice(user_id, device_id);

      callback(null, result);
    } catch (error: any) {
      logger.error(error, "Error in revokeDevice");
      callback({
        code: status.INTERNAL,
        message: error.message || "Device revocation failed",
      });
    }
  }
}

export const deviceController = new DeviceController();
