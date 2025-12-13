// Original file: src/proto/account.proto

export const AccountStatus = {
  ACTIVE: 'ACTIVE',
  CLOSED: 'CLOSED',
  FROZEN: 'FROZEN',
} as const;

export type AccountStatus =
  | 'ACTIVE'
  | 0
  | 'CLOSED'
  | 1
  | 'FROZEN'
  | 2

export type AccountStatus__Output = typeof AccountStatus[keyof typeof AccountStatus]
