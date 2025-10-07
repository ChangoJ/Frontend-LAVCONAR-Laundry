// Interface para el response del logout
export interface LogoutResponse {
  status: number;
  message: string;
  timestamp: Date;
}

// Interface para el response del refresh token
export interface RefreshTokenResponse {
  status: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
  timestamp: Date;
}

// Interface para el response del verify token (si lo implementamos)
export interface VerifyTokenResponse {
  status: number;
  message: string;
  data: {
    user: {
      id: string;
      username: string;
      email: string;
      branch_office_id: string;
      allowed_branches: any[];
      roles: string[];
    };
    valid: boolean;
  };
  timestamp: Date;
}
