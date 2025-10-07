import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBranchOfficeAction } from "../../actions/branch-office/delete-branch-office.action";
import { toast } from "sonner";

export const useDeleteBranchOfficeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBranchOfficeAction(id),
    onSuccess: () => {
      // Invalidar la lista de sucursales para refrescar los datos
      queryClient.invalidateQueries({ queryKey: ["branch-offices"] });

      toast.success("Sucursal eliminada exitosamente");
    },
    onError: (error: any) => {
      console.error("Error deleting branch office:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Error al eliminar la sucursal";

      toast.error(errorMessage);
    },
  });
};
