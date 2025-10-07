import { adminBranchOfficesApi } from "../../api/admin-branch.api";
import type { BranchOfficeUsersResponse } from "../../interfaces/branch-office/branch-office.response";

export const getBranchOfficeUsersAction = async (
  id: string
): Promise<BranchOfficeUsersResponse> => {
  const response = await adminBranchOfficesApi.get(`/${id}/users`);
  return response.data;
};
