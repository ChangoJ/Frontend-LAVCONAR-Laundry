import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutAction } from "../actions/logout.action";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { clearAuth } = useAuth();

  return useMutation({
    mutationFn: logoutAction,
    onSuccess: () => {
      // Limpiar el contexto de autenticación (esto también limpia localStorage)
      clearAuth();

      // Limpiar todas las queries del cache
      queryClient.clear();

      // Mostrar mensaje de éxito
      toast.success("Sesión cerrada correctamente");

      // Redirigir al login
      navigate("/auth/login", { replace: true });
    },
    onError: (error) => {
      console.error("Error during logout:", error);

      // Incluso si falla la llamada al servidor, limpiamos localmente
      clearAuth();

      queryClient.clear();

      toast.error("Error al cerrar sesión, pero se ha cerrado localmente");
      navigate("/auth/login", { replace: true });
    },
  });
};
