import { useMutation, useQueryClient } from "@tanstack/react-query";
import { refreshTokenAction } from "../actions/refresh-token.action";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export const useRefreshTokenMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: refreshTokenAction,
    onSuccess: (data) => {
      // Actualizar tokens en localStorage
      if (data?.data?.accessToken) {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
      }

      // Invalidar queries de auth para que se actualicen
      queryClient.invalidateQueries({ queryKey: ["auth"] });

      console.log("Token refreshed successfully");
    },
    onError: (error: any) => {
      console.error("Error refreshing token:", error);

      // Si falla el refresh, limpiar todo y redirigir al login
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      queryClient.clear();

      toast.error("Sesión expirada, por favor inicia sesión nuevamente");

      // Redirigir al login
      navigate("/auth/login", { replace: true });
    },
  });
};
