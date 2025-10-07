import { adminBranchOfficesApi } from "../../api/admin-branch.api";
import type { UpdateBranchOfficeData } from "../../interfaces/branch-office/branch-office.interface";
import type { BranchOfficeResponse } from "../../interfaces/branch-office/branch-office.response";

export const updateBranchOfficeAction = async (
  id: string,
  data: UpdateBranchOfficeData
): Promise<BranchOfficeResponse> => {
  const response = await adminBranchOfficesApi.patch(`/${id}`, data);
  return response.data;
};
