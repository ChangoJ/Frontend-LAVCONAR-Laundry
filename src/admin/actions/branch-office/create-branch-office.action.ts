import { adminBranchOfficesApi } from "../../api/admin-branch.api";
import type { CreateBranchOfficeData } from "../../interfaces/branch-office/branch-office.interface";
import type { BranchOfficeResponse } from "../../interfaces/branch-office/branch-office.response";

export const createBranchOfficeAction = async (
  data: CreateBranchOfficeData
): Promise<BranchOfficeResponse> => {
  const response = await adminBranchOfficesApi.post("/", data);
  return response.data;
};
