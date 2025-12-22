// Original file: src/proto/transaction.proto

export const TransactionType = {
  TRANSFER: 'TRANSFER',
  DEPOSIT: 'DEPOSIT',
  WITHDRAW: 'WITHDRAW',
} as const;

export type TransactionType =
  | 'TRANSFER'
  | 0
  | 'DEPOSIT'
  | 1
  | 'WITHDRAW'
  | 2

export type TransactionType__Output = typeof TransactionType[keyof typeof TransactionType]
