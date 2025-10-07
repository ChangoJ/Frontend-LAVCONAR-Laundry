import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBranchOfficeAction } from "../../actions/branch-office/create-branch-office.action";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import type { CreateBranchOfficeData } from "../../interfaces/branch-office/branch-office.interface";

export const useCreateBranchOfficeMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: CreateBranchOfficeData) =>
      createBranchOfficeAction(data),
    onSuccess: () => {
      // Invalidar la lista de sucursales para refrescar los datos
      queryClient.invalidateQueries({ queryKey: ["branch-offices"] });

      toast.success("Sucursal creada exitosamente");

      // Redirigir a la lista de sucursales
      navigate("/admin/branch-offices");
    },
    onError: (error: any) => {
      console.error("Error creating branch office:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Error al crear la sucursal";

      toast.error(errorMessage);
    },
  });
};
