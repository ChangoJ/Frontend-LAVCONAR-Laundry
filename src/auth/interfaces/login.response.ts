export interface LoginResponse {
  status: number;
  message: string;
  data: Data;
  timestamp: Date;
}

export interface Data {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  branch_office_id: string;
  allowed_branches: any[];
  roles: string[];
}
