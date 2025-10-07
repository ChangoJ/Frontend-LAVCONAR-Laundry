import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAction } from "../actions/login.action";
import type { LoginResponse } from "../interfaces/login.response";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";

interface LoginCredentialsProps {
  username: string;
  password: string;
  branchOfficeId?: string;
}

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { initializeAuth } = useAuth();

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

        // Actualizar el contexto de autenticación
        initializeAuth();

        // Invalidar cache de verificación de auth para que se actualice
        queryClient.invalidateQueries({ queryKey: ["auth", "verify"] });

        // Mostrar mensaje de bienvenida
        toast.success(`¡Bienvenido, ${data.data.user.username}!`);

        // Redirigir al dashboard
        navigate("/admin/dashboard", { replace: true });
      }
    },
    onError: (error: any) => {
      console.error("Login failed:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Error al iniciar sesión";

      toast.error(errorMessage);
    },
  });
};
