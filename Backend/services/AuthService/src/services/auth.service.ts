import { refreshTokenRepository, userRepository } from "../repositories";
import { JwtUtil, JwtPayload, TokenGenerator } from "../utils";
import { PasswordUtil } from "../utils/password.util";
import logger from "../utils/logger";
import { jwtConfig } from "../config";

export class AuthService {
  async register(email: string, password: string): Promise<any> {
    // Validate email and password
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash password
    const passwordHash = await PasswordUtil.hash(password);

    // Create user
    const user = await userRepository.create({
      email,
      password: passwordHash,
      role: "USER",
    });

    // Generate tokens
    const tokens = this.generateTokens(user);

    // Save refresh token
    const refreshTokenExpiry = this.getExpiryDate(jwtConfig.refreshExpiry);
    await refreshTokenRepository.create({
      token: tokens.refreshToken,
      user_id: user.id,
      expires_at: refreshTokenExpiry,
    });

    logger.info(
      { userId: user.id, email: user.email },
      "User registered successfully",
    );

    return {
      success: true,
      message: "Registration successful",
      user_id: user.id,
      email: user.email,
      role: user.role,
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  async login(email: string, password: string): Promise<any> {
    // Validate inputs
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Find user
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Verify password
    const isPasswordValid = await PasswordUtil.compare(
      password,
      user.password_hash,
    );
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Generate tokens
    const tokens = this.generateTokens(user);

    // Save refresh token
    const refreshTokenExpiry = this.getExpiryDate(jwtConfig.refreshExpiry);
    await refreshTokenRepository.create({
      token: tokens.refreshToken,
      user_id: user.id,
      expires_at: refreshTokenExpiry,
    });

    logger.info(
      { userId: user.id, email: user.email },
      "User logged in successfully",
    );

    return {
      success: true,
      message: "Login successful",
      user_id: user.id,
      email: user.email,
      role: user.role,
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<any> {
    // Verify refresh token
    let payload: JwtPayload;
    try {
      payload = JwtUtil.verifyRefreshToken(refreshToken);
    } catch (error) {
      throw new Error("Invalid refresh token");
    }

    // Find refresh token in database
    const storedToken = await refreshTokenRepository.findByToken(refreshToken);
    if (!storedToken || storedToken.revoked) {
      throw new Error("Refresh token has been revoked");
    }

    // Find user
    const user = await userRepository.findById(payload.userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Generate new tokens
    const tokens = this.generateTokens(user);

    // Revoke old token and save new one
    await refreshTokenRepository.revokeToken(refreshToken);
    const refreshTokenExpiry = this.getExpiryDate(jwtConfig.refreshExpiry);
    await refreshTokenRepository.create({
      token: tokens.refreshToken,
      user_id: user.id,
      expires_at: refreshTokenExpiry,
    });

    logger.info({ userId: user.id }, "Token refreshed successfully");

    return {
      success: true,
      message: "Token refreshed",
      user_id: user.id,
      email: user.email,
      role: user.role,
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  async validateToken(accessToken: string): Promise<any> {
    try {
      const payload = JwtUtil.verifyAccessToken(accessToken);
      const user = await userRepository.findById(payload.userId);

      if (!user) {
        throw new Error("User not found");
      }

      return {
        valid: true,
        user_id: payload.userId,
        email: payload.email,
        role: payload.role,
        message: "Token is valid",
      };
    } catch (error) {
      return {
        valid: false,
        message: "Token is invalid or expired",
      };
    }
  }

  async logout(userId: string, refreshToken: string): Promise<any> {
    // Revoke refresh token
    await refreshTokenRepository.revokeToken(refreshToken);

    logger.info({ userId }, "User logged out successfully");

    return {
      success: true,
      message: "Logout successful",
    };
  }

  async revokeRefreshToken(refreshToken: string): Promise<any> {
    // Revoke refresh token without user context
    await refreshTokenRepository.revokeToken(refreshToken);

    logger.info({ refreshToken }, "Refresh token revoked");

    return {
      success: true,
      message: "Refresh token revoked",
    };
  }

  private generateTokens(user: any): {
    accessToken: string;
    refreshToken: string;
  } {
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: JwtUtil.generateAccessToken(payload),
      refreshToken: JwtUtil.generateRefreshToken(payload),
    };
  }

  private getExpiryDate(expiry: string): Date {
    const now = new Date();
    const units: any = {
      d: 86400000,
      h: 3600000,
      m: 60000,
      s: 1000,
    };

    const match = expiry.match(/^(\d+)([dhms])$/);
    if (!match) {
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // Default 7 days
    }

    const amount = parseInt(match[1]);
    const unit = match[2];
    const ms = amount * (units[unit] || units.d);

    return new Date(now.getTime() + ms);
  }
}

export const authService = new AuthService();
