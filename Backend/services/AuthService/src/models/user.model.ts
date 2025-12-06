export interface User {
  id: string;
  email: string;
  password_hash: string;
  role: "USER" | "ADMIN";
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserDto {
  email: string;
  password: string;
  role?: "USER" | "ADMIN";
}

export interface UserWithoutPassword {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
  created_at: Date;
  updated_at: Date;
}
