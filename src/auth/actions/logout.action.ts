import { authApi } from "../api/auth.api";
import type { LogoutResponse } from "../interfaces/auth.response";

export const logoutAction = async (): Promise<LogoutResponse> => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  const { data } = await authApi.post<LogoutResponse>("/logout", {
    refreshToken,
  });

  if (!data) {
    throw new Error("Logout failed");
  }

  return data;
};
