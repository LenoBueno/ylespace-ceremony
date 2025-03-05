
export interface User {
  id: string;
  email: string;
  role: string;
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
