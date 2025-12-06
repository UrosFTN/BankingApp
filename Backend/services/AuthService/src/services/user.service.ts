import { userRepository } from "../repositories";
import { PasswordUtil, ValidationUtil } from "../utils";
import logger from "../utils/logger";

export class UserService {
  async createUser(email: string, password: string): Promise<any> {
    // Validate email
    if (!ValidationUtil.isValidEmail(email)) {
      throw new Error("Invalid email format");
    }

    // Sanitize email
    const sanitizedEmail = ValidationUtil.sanitizeEmail(email);

    // Validate password
    const passwordValidation = PasswordUtil.validate(password);
    if (!passwordValidation.valid) {
      throw new Error(passwordValidation.message);
    }

    // Check if user already exists
    const existingUser = await userRepository.findByEmail(sanitizedEmail);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Hash password
    const passwordHash = await PasswordUtil.hash(password);

    // Create user
    const user = await userRepository.create({
      email: sanitizedEmail,
      password: passwordHash,
      role: "USER",
    });

    logger.info({ userId: user.id }, "User created successfully");

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  async getUserById(userId: string): Promise<any> {
    const user = await userRepository.findByIdWithoutPassword(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<any> {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    // Get user with password
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Verify old password
    const isPasswordValid = await PasswordUtil.compare(
      oldPassword,
      user.password_hash,
    );
    if (!isPasswordValid) {
      throw new Error("Old password is incorrect");
    }

    // Validate new password
    const passwordValidation = PasswordUtil.validate(newPassword);
    if (!passwordValidation.valid) {
      throw new Error(passwordValidation.message);
    }

    // Hash new password
    const newPasswordHash = await PasswordUtil.hash(newPassword);

    // Update password
    await userRepository.updatePassword(userId, newPasswordHash);

    logger.info({ userId }, "Password changed successfully");
  }
}

export const userService = new UserService();
