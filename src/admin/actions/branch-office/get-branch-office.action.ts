import { adminBranchOfficesApi } from "../../api/admin-branch.api";
import type { BranchOfficeResponse } from "../../interfaces/branch-office/branch-office.response";

export const getBranchOfficeAction = async (
  id: string
): Promise<BranchOfficeResponse> => {
  const response = await adminBranchOfficesApi.get(`/${id}`);
  return response.data;
};
