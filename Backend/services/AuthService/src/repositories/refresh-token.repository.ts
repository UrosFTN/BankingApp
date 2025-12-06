import { pool } from "./database";
import { RefreshToken, CreateRefreshTokenDto } from "../models";

export class RefreshTokenRepository {
  async create(tokenData: CreateRefreshTokenDto): Promise<RefreshToken> {
    const query = `
      INSERT INTO refresh_tokens (token, user_id, expires_at)
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

  async findByToken(token: string): Promise<RefreshToken | null> {
    const query = "SELECT * FROM refresh_tokens WHERE token = $1";
    const result = await pool.query(query, [token]);
    return result.rows[0] || null;
  }

  async findByUserId(userId: string): Promise<RefreshToken[]> {
    const query =
      "SELECT * FROM refresh_tokens WHERE user_id = $1 AND revoked = false";
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  async revokeToken(token: string): Promise<void> {
    const query = "UPDATE refresh_tokens SET revoked = true WHERE token = $1";
    await pool.query(query, [token]);
  }

  async revokeAllUserTokens(userId: string): Promise<void> {
    const query = "UPDATE refresh_tokens SET revoked = true WHERE user_id = $1";
    await pool.query(query, [userId]);
  }

  async deleteExpiredTokens(): Promise<void> {
    const query =
      "DELETE FROM refresh_tokens WHERE expires_at < CURRENT_TIMESTAMP";
    await pool.query(query);
  }
}

export const refreshTokenRepository = new RefreshTokenRepository();
