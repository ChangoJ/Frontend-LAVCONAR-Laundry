import { useMutation } from "@tanstack/react-query";
import { loginAction } from "../actions/login.action";
import type { LoginResponse } from "../interfaces/login.response";

interface LoginCredentialsProps {
  username: string;
  password: string;
  branchOfficeId?: string;
}

export const useLoginMutation = () => {
  return useMutation<LoginResponse, Error, LoginCredentialsProps>({
    mutationFn: (credentials: LoginCredentialsProps) =>
      loginAction(credentials),
    onSuccess: (data) => {
      console.log("Login successful:", data);

      // Store tokens in localStorage
      if (data?.data?.accessToken) {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.data.user));
      }

      // Redirect to dashboard or appropriate page
      // This should be handled by the component using this hook
    },
    onError: (error) => {
      console.error("Login failed:", error);
      // Handle login error here
    },
  });
};
