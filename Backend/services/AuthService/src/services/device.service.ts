import { deviceRepository, userRepository } from "../repositories";
import { JwtUtil, TokenGenerator } from "../utils";
import logger from "../utils/logger";
import { jwtConfig } from "../config";

export class DeviceService {
  async registerDevice(
    userId: string,
    deviceId: string,
    deviceName: string,
  ): Promise<any> {
    // Verify user exists
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if device already registered
    const existingDevice = await deviceRepository.findByUserIdAndDeviceId(
      userId,
      deviceId,
    );
    if (existingDevice) {
      // Update device token and last used
      const newDeviceToken = JwtUtil.generateDeviceToken({
        userId,
        deviceId,
      });
      await deviceRepository.updateLastUsed(existingDevice.device_token);
      return {
        success: true,
        message: "Device already registered",
        device_token: newDeviceToken,
      };
    }

    // Generate device token
    const deviceToken = JwtUtil.generateDeviceToken({
      userId,
      deviceId,
    });

    // Save device
    await deviceRepository.create({
      user_id: userId,
      device_token: deviceToken,
      device_id: deviceId,
      device_name: deviceName,
    });

    logger.info(
      { userId, deviceId, deviceName },
      "Device registered successfully",
    );

    return {
      success: true,
      message: "Device registered successfully",
      device_token: deviceToken,
    };
  }

  async authenticateWithDevice(deviceToken: string): Promise<any> {
    // Verify device token
    let payload;
    try {
      payload = JwtUtil.verifyDeviceToken(deviceToken);
    } catch (error) {
      throw new Error("Invalid device token");
    }

    // Find device
    const device = await deviceRepository.findByDeviceToken(deviceToken);
    if (!device) {
      throw new Error("Device not found or revoked");
    }

    // Update last used
    await deviceRepository.updateLastUsed(deviceToken);

    // Get user
    const user = await userRepository.findById(payload.userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Generate JWT tokens
    const accessToken = JwtUtil.generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = JwtUtil.generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    logger.info(
      { userId: user.id, deviceId: device.device_id },
      "Device authentication successful",
    );

    return {
      success: true,
      message: "Device authentication successful",
      user_id: user.id,
      email: user.email,
      role: user.role,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async getUserDevices(userId: string): Promise<any> {
    // Verify user exists
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Get devices
    const devices = await deviceRepository.findByUserId(userId);

    return {
      success: true,
      devices: devices.map((device) => ({
        id: device.id,
        device_id: device.device_id,
        device_name: device.device_name,
        last_used_at: device.last_used_at.toISOString(),
        created_at: device.created_at.toISOString(),
      })),
    };
  }

  async revokeDevice(userId: string, deviceId: string): Promise<any> {
    // Delete device
    await deviceRepository.delete(userId, deviceId);

    logger.info({ userId, deviceId }, "Device revoked successfully");

    return {
      success: true,
      message: "Device revoked successfully",
    };
  }
}

export const deviceService = new DeviceService();
