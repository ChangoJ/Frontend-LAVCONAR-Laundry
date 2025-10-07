import { authApi } from "../api/auth.api";
import type { LoginResponse } from "../interfaces/login.response";

interface LoginCredentialsProps {
  username: string;
  password: string;
  branchOfficeId?: string;
}

export const loginAction = async (credentials: LoginCredentialsProps) => {
  const { data } = await authApi.post<LoginResponse>("/login", credentials);

  if (!data) throw new Error("Login failed");

  return data;
};
