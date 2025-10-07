import type {
  BranchOffice,
  BranchOfficeUser,
} from "../interfaces/branch-office.interface";

export interface BranchOfficeResponse {
  success: boolean;
  message: string;
  data: BranchOffice;
}

export interface BranchOfficesListResponse {
  success: boolean;
  message: string;
  data: BranchOffice[];
}

export interface BranchOfficeUsersResponse {
  success: boolean;
  message: string;
  data: BranchOfficeUser[];
}

export interface DeleteBranchOfficeResponse {
  success: boolean;
  message: string;
}
