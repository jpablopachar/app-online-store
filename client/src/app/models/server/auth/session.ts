import { User } from './user'

export interface Session {
  token?: string;
  expiresIn: string;
}

export interface MeData {
  status: boolean;
  message?: string;
  user?: User;
}
