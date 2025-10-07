import { adminBranchOfficesApi } from "../../api/admin-branch.api";
import type { DeleteBranchOfficeResponse } from "../../interfaces/branch-office/branch-office.response";

export const deleteBranchOfficeAction = async (
  id: string
): Promise<DeleteBranchOfficeResponse> => {
  const response = await adminBranchOfficesApi.delete(`/${id}`);
  return response.data;
};
