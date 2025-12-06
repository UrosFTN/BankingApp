import { pool } from "./database";
import { PasswordResetToken, CreatePasswordResetTokenDto } from "../models";

export class PasswordResetTokenRepository {
  async create(
    tokenData: CreatePasswordResetTokenDto,
  ): Promise<PasswordResetToken> {
    const query = `
      INSERT INTO password_reset_tokens (token, user_id, expires_at)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const result = await pool.query(query, [
      tokenData.token,
      tokenData.user_id,
      tokenData.expires_at,
    ]);

    return result.rows[0];
  }

  async findByToken(token: string): Promise<PasswordResetToken | null> {
    const query = "SELECT * FROM password_reset_tokens WHERE token = $1";
    const result = await pool.query(query, [token]);
    return result.rows[0] || null;
  }

  async markAsUsed(token: string): Promise<void> {
    const query =
      "UPDATE password_reset_tokens SET used = true WHERE token = $1";
    await pool.query(query, [token]);
  }

  async invalidateUserTokens(userId: string): Promise<void> {
    const query =
      "UPDATE password_reset_tokens SET used = true WHERE user_id = $1 AND used = false";
    await pool.query(query, [userId]);
  }

  async deleteExpiredTokens(): Promise<void> {
    const query =
      "DELETE FROM password_reset_tokens WHERE expires_at < CURRENT_TIMESTAMP";
    await pool.query(query);
  }
}

export const passwordResetTokenRepository = new PasswordResetTokenRepository();
