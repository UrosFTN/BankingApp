// Original file: src/proto/account.proto

export const AccountType = {
  CHECKING: 'CHECKING',
  SAVINGS: 'SAVINGS',
  CREDIT: 'CREDIT',
} as const;

export type AccountType =
  | 'CHECKING'
  | 0
  | 'SAVINGS'
  | 1
  | 'CREDIT'
  | 2

export type AccountType__Output = typeof AccountType[keyof typeof AccountType]
