import { User } from "./user"

export interface RegisterForm {
  name: string;
  lastName: string;
  email: string;
  password: string;
  birthday: string;
  role?: string;
  // active?: boolean;
}

export interface RegisterResult {
  status: boolean;
  message: string;
  user?: User;
}