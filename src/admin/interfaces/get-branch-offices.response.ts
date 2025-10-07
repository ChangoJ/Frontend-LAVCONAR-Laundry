export interface BranchOfficesResponse {
  status: number;
  message: string;
  data: BranchOffice[];
  timestamp: Date;
}

export interface BranchOffice {
  id: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  status: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
