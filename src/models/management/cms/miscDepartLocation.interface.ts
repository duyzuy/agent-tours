import { BaseResponse, Status } from "@/models/common.interface";

export interface IDepartLocation {
  cat: "localmisc_departfrom";
  id: number;
  key: string;
  name_vi: string;
  name_en: string;
  status: Status;
}

export interface MiscDepartPayload {
  id?: number;
  key?: string; //không thể edit
  name_vi?: string;
  name_en?: string;
  status?: Status;
}
export interface MiscDepartLocationsResponse extends BaseResponse<IDepartLocation[]> {}
export interface MiscDepartLocationResponse extends BaseResponse<IDepartLocation> {}
