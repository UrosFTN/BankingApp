// Original file: proto/auth.proto

import type { Device as _auth_Device, Device__Output as _auth_Device__Output } from '../auth/Device';

export interface GetUserDevicesResponse {
  'devices'?: (_auth_Device)[];
}

export interface GetUserDevicesResponse__Output {
  'devices': (_auth_Device__Output)[];
}
