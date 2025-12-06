import crypto from "crypto";

const { v4: uuidv4 } = require("uuid");

export class TokenGenerator {
  static generateUUID(): string {
    return uuidv4();
  }

  static generateRandomToken(length: number = 32): string {
    return crypto.randomBytes(length).toString("hex");
  }

  static generatePasswordResetToken(): string {
    return this.generateRandomToken(32);
  }
}
