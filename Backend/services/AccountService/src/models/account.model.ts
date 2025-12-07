export interface Account {
  id: string;
  user_id: string;
  currency: string;
  balance: number;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateAccountDto {
  user_id: string;
  currency: string;
}
