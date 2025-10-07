import { adminBranchOfficesApi } from "../../api/admin-branch.api";
import type { BranchOfficesListResponse } from "../../interfaces/branch-office/branch-office.response";

export const getBranchOfficesAction =
  async (): Promise<BranchOfficesListResponse> => {
    const response = await adminBranchOfficesApi.get("/");
    return response.data;
  };
