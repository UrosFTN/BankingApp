import { pool } from "./database";
import { User, CreateUserDto, UserWithoutPassword } from "../models";

export class UserRepository {
  async create(userData: CreateUserDto): Promise<User> {
    const query = `
      INSERT INTO users (email, password_hash, role)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const result = await pool.query(query, [
      userData.email,
      userData.password,
      userData.role || "USER",
    ]);

    return result.rows[0];
  }

  async findById(id: string): Promise<User | null> {
    const query = "SELECT * FROM users WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }

  async findByIdWithoutPassword(
    id: string,
  ): Promise<UserWithoutPassword | null> {
    const query =
      "SELECT id, email, role, created_at, updated_at FROM users WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async updatePassword(userId: string, newPasswordHash: string): Promise<void> {
    const query = `
      UPDATE users 
      SET password_hash = $1, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $2
    `;
    await pool.query(query, [newPasswordHash, userId]);
  }

  async delete(id: string): Promise<void> {
    const query = "DELETE FROM users WHERE id = $1";
    await pool.query(query, [id]);
  }
}

export const userRepository = new UserRepository();
