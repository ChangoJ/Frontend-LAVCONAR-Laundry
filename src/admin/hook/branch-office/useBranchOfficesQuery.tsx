import { useQuery } from "@tanstack/react-query";
import { getBranchOfficesAction } from "../../actions/branch-office/get-branch-offices.action";

export const useBranchOfficesQuery = () => {
  return useQuery({
    queryKey: ["branch-offices"],
    queryFn: getBranchOfficesAction,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};
