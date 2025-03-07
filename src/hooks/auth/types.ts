
import type { Database } from "../../integrations/supabase/types";

export type UserRole = Database["public"]["Enums"]["user_role"];

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  confirmPassword?: string;
}
