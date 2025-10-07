import { adminBranchOfficesApi } from "../api/admin-branch.api";
import type { BranchOfficesResponse } from "../interfaces/get-branch-offices.interface";

export const getBranchOfficesAction =
  async (): Promise<BranchOfficesResponse> => {
    const { data } = await adminBranchOfficesApi.get<BranchOfficesResponse>(
      `/`
    );
    if (!data) throw new Error("Hero not found");

    return {
      ...data,
    };
  };
