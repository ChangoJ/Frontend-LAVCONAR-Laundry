import { useQuery } from "@tanstack/react-query";
import { getBranchOfficeUsersAction } from "../../actions/branch-office/get-branch-office-users.action";

export const useBranchOfficeUsersQuery = (id: string) => {
  return useQuery({
    queryKey: ["branch-office-users", id],
    queryFn: () => getBranchOfficeUsersAction(id),
    enabled: !!id,
  });
};
