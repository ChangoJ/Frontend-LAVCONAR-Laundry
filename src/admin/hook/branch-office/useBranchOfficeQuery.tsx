import { useQuery } from "@tanstack/react-query";
import { getBranchOfficeAction } from "../../actions/branch-office/get-branch-office.action";

export const useBranchOfficeQuery = (id: string) => {
  return useQuery({
    queryKey: ["branch-office", id],
    queryFn: () => getBranchOfficeAction(id),
    enabled: !!id,
  });
};
