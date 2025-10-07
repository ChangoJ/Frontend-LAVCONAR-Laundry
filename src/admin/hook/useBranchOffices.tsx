import { useQuery } from "@tanstack/react-query";
import { getBranchOfficesAction } from "../actions/get-branch-offices.action";

export const useBrachOffices = () => {
  return useQuery({
    queryKey: ["branch-offices"],
    queryFn: () => getBranchOfficesAction(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
};
