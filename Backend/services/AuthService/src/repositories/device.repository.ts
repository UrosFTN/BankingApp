import { pool } from "./database";
import { Device, CreateDeviceDto } from "../models";

export class DeviceRepository {
  async create(deviceData: CreateDeviceDto): Promise<Device> {
    const query = `
      INSERT INTO devices (user_id, device_token, device_id, device_name)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const result = await pool.query(query, [
      deviceData.user_id,
      deviceData.device_token,
      deviceData.device_id,
      deviceData.device_name,
    ]);

    return result.rows[0];
  }

  async findByDeviceToken(deviceToken: string): Promise<Device | null> {
    const query = "SELECT * FROM devices WHERE device_token = $1";
    const result = await pool.query(query, [deviceToken]);
    return result.rows[0] || null;
  }

  async findByUserIdAndDeviceId(
    userId: string,
    deviceId: string,
  ): Promise<Device | null> {
    const query = "SELECT * FROM devices WHERE user_id = $1 AND device_id = $2";
    const result = await pool.query(query, [userId, deviceId]);
    return result.rows[0] || null;
  }

  async findByUserId(userId: string): Promise<Device[]> {
    const query =
      "SELECT * FROM devices WHERE user_id = $1 ORDER BY last_used_at DESC";
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  async updateLastUsed(deviceToken: string): Promise<void> {
    const query =
      "UPDATE devices SET last_used_at = CURRENT_TIMESTAMP WHERE device_token = $1";
    await pool.query(query, [deviceToken]);
  }

  async delete(userId: string, deviceId: string): Promise<void> {
    const query = "DELETE FROM devices WHERE user_id = $1 AND device_id = $2";
    await pool.query(query, [userId, deviceId]);
  }

  async deleteByDeviceToken(deviceToken: string): Promise<void> {
    const query = "DELETE FROM devices WHERE device_token = $1";
    await pool.query(query, [deviceToken]);
  }
}

export const deviceRepository = new DeviceRepository();
