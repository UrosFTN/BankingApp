export interface Device {
  id: string;
  user_id: string;
  device_token: string;
  device_id: string;
  device_name: string;
  last_used_at: Date;
  created_at: Date;
}

export interface CreateDeviceDto {
  user_id: string;
  device_token: string;
  device_id: string;
  device_name: string;
}
