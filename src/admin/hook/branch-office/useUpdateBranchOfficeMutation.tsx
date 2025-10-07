import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBranchOfficeAction } from "../../actions/branch-office/update-branch-office.action";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import type { UpdateBranchOfficeData } from "../../interfaces/branch-office/branch-office.interface";

export const useUpdateBranchOfficeMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBranchOfficeData }) =>
      updateBranchOfficeAction(id, data),
    onSuccess: () => {
      // Invalidar las queries relacionadas
      queryClient.invalidateQueries({ queryKey: ["branch-offices"] });
      queryClient.invalidateQueries({ queryKey: ["branch-office"] });

      toast.success("Sucursal actualizada exitosamente");

      // Redirigir a la lista de sucursales
      navigate("/admin/branch-offices");
    },
    onError: (error: any) => {
      console.error("Error updating branch office:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Error al actualizar la sucursal";

      toast.error(errorMessage);
    },
  });
};
