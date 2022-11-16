import { User } from "./user"

export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  token?: string;
  user?: User;
}
