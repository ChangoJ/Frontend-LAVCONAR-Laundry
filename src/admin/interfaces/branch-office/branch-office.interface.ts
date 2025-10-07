export interface BranchOffice {
  id: string;
  name: string;
  code?: string;
  address?: string;
  phone?: string;
  status: "ACTIVE" | "INACTIVE";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateBranchOfficeData {
  name: string;
  code?: string;
  address?: string;
  phone?: string;
}

export interface UpdateBranchOfficeData
  extends Partial<CreateBranchOfficeData> {}

export interface BranchOfficeUser {
  id: string;
  email: string;
  username: string;
  roles: string[];
  status: "ACTIVE" | "INACTIVE";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
