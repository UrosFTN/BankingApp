export interface PasswordResetToken {
  id: string;
  token: string;
  user_id: string;
  expires_at: Date;
  used: boolean;
  created_at: Date;
}

export interface CreatePasswordResetTokenDto {
  token: string;
  user_id: string;
  expires_at: Date;
}
