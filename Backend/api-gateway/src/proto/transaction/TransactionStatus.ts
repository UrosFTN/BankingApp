// Original file: src/proto/transaction.proto

export const TransactionStatus = {
  APPROVED: 'APPROVED',
  PENDING: 'PENDING',
  DECLINED: 'DECLINED',
} as const;

export type TransactionStatus =
  | 'APPROVED'
  | 0
  | 'PENDING'
  | 1
  | 'DECLINED'
  | 2

export type TransactionStatus__Output = typeof TransactionStatus[keyof typeof TransactionStatus]
