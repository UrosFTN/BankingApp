import { passwordResetTokenRepository, userRepository } from "../repositories";
import { TokenGenerator, PasswordUtil } from "../utils";
import logger from "../utils/logger";

export class PasswordService {
  async requestPasswordReset(email: string): Promise<any> {
    // Find user
    const user = await userRepository.findByEmail(email);
    if (!user) {
      // Don't reveal if email exists (security best practice)
      return {
        success: true,
        message: "If the email exists, a password reset link will be sent",
      };
    }

    // Invalidate existing reset tokens
    await passwordResetTokenRepository.invalidateUserTokens(user.id);

    // Generate reset token
    const resetToken = TokenGenerator.generatePasswordResetToken();

    // Calculate expiry (24 hours from now)
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 24);

    // Save reset token
    await passwordResetTokenRepository.create({
      token: resetToken,
      user_id: user.id,
      expires_at: expiryDate,
    });

    logger.info(
      { userId: user.id, email: user.email },
      "Password reset requested",
    );

    return {
      success: true,
      message: "If the email exists, a password reset link will be sent",
      reset_token: resetToken, // In production, send this via email
    };
  }

  async resetPassword(resetToken: string, newPassword: string): Promise<any> {
    // Validate password
    const passwordValidation = PasswordUtil.validate(newPassword);
    if (!passwordValidation.valid) {
      throw new Error(passwordValidation.message);
    }

    // Find reset token
    const token = await passwordResetTokenRepository.findByToken(resetToken);
    if (!token) {
      throw new Error("Invalid or expired reset token");
    }

    // Check if token is expired
    if (token.expires_at < new Date()) {
      throw new Error("Reset token has expired");
    }

    // Check if token is already used
    if (token.used) {
      throw new Error("Reset token has already been used");
    }

    // Find user
    const user = await userRepository.findById(token.user_id);
    if (!user) {
      throw new Error("User not found");
    }

    // Hash new password
    const passwordHash = await PasswordUtil.hash(newPassword);

    // Update password
    await userRepository.updatePassword(user.id, passwordHash);

    // Mark token as used
    await passwordResetTokenRepository.markAsUsed(resetToken);

    logger.info({ userId: user.id }, "Password reset successfully");

    return {
      success: true,
      message: "Password reset successfully",
    };
  }
}

export const passwordService = new PasswordService();
