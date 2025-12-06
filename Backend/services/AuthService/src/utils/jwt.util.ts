import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { jwtConfig } from "../config";

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export interface DeviceTokenPayload {
  userId: string;
  deviceId: string;
}

export class JwtUtil {
  static generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(
      payload,
      jwtConfig.accessSecret as Secret,
      { expiresIn: jwtConfig.accessExpiry } as SignOptions,
    );
  }

  static generateRefreshToken(payload: JwtPayload): string {
    return jwt.sign(
      payload,
      jwtConfig.refreshSecret as Secret,
      { expiresIn: jwtConfig.refreshExpiry } as SignOptions,
    );
  }

  static generateDeviceToken(payload: DeviceTokenPayload): string {
    return jwt.sign(
      payload,
      jwtConfig.accessSecret as Secret,
      { expiresIn: jwtConfig.deviceTokenExpiry } as SignOptions,
    );
  }

  static verifyAccessToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, jwtConfig.accessSecret as Secret) as JwtPayload;
    } catch (error) {
      throw new Error("Invalid or expired access token");
    }
  }

  static verifyRefreshToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, jwtConfig.refreshSecret as Secret) as JwtPayload;
    } catch (error) {
      throw new Error("Invalid or expired refresh token");
    }
  }

  static verifyDeviceToken(token: string): DeviceTokenPayload {
    try {
      return jwt.verify(
        token,
        jwtConfig.accessSecret as Secret,
      ) as DeviceTokenPayload;
    } catch (error) {
      throw new Error("Invalid or expired device token");
    }
  }

  static decodeToken(token: string): any {
    return jwt.decode(token);
  }
}
