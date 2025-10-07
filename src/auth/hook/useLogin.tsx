import { useQuery } from "@tanstack/react-query";
import { loginAction } from "../actions/login.action";

interface LoginCredentialsProps {
  username: string;
  password: string;
  branchOfficeId?: string;
}

export const useLogin = (credentials: LoginCredentialsProps) => {
  return useQuery({
    queryKey: ["login", credentials],
    queryFn: () => loginAction(credentials),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
};
