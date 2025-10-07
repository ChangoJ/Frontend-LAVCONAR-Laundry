import { authApi } from "../api/auth.api";
import type { RefreshTokenResponse } from "../interfaces/auth.response";

export const refreshTokenAction = async (): Promise<RefreshTokenResponse> => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  const { data } = await authApi.post<RefreshTokenResponse>("/refresh", {
    refreshToken,
  });

  if (!data) {
    throw new Error("Refresh token failed");
  }

  return data;
};
