import { BaseResponse } from "../common.interface";

export enum ELocalUserType {
  ADMIN = "ADMIN",
  STAFF = "STAFF",
  AGENT = "AGENT",
  AGENT_STAFF = "AGENT_STAFF",
}
export interface ILocalUser {
  recId: number;
  userId: string;
  username: string;
  password: string;
  privateKey: string;
  phoneNumber: string;
  email: string;
  userType: ELocalUserType;
  mainRole: string;
  mainRoleName: string;
  fullname: string;
  infoEmail: string;
  descriptions: string;
  infoCompanyName: string;
  infoLegalRepresentative: string;
  infoPosition: string;
  infoPhoneNumber: string;
  infoAddress: string;
  infoTaxcode: string;
  infoBanking: string;
  infoSpecialNote: string;
  status: "OK" | "XX" | "OX"; // status: "OK" => đang sử dụng (active) | "XX" => bị xoá | "OX" => de-active
  sysFstUser: string;
  sysFstUpdate: Date;
  sysBelongTo: string;
  sysLstUser: string;
  sysLstUpdate: string;
}
export interface LocalUserListResponse extends BaseResponse<ILocalUser[]> {}
export interface LocalUserResponse extends BaseResponse<ILocalUser> {}
export type ILocalUserMinimal = Pick<ILocalUser, "recId" | "userType" | "fullname" | "email" | "phoneNumber">;
export interface LocalUserAgentListResponse extends BaseResponse<ILocalUserMinimal[]> {}

export interface ILocalUserPayload {
  username?: string;
  fullname?: string;
  infoEmail?: string;
  password?: string;
  phoneNumber?: string;
  userType?: ELocalUserType;
  email?: string;
  mainRole?: string;
  mainRoleName?: string;
  descriptions?: string;
  infoCompanyName?: string;
  infoLegalRepresentative?: string;
  infoPosition?: string;
  infoPhoneNumber?: string | null;
  infoAddress?: string;
  infoTaxcode?: string;
  infoBanking?: string;
  infoSpecialNote?: string;
  status?: "OK" | "XX" | "OX";
}

export interface LocalUserNewPasswordPayload {
  username?: string;
  newPassword?: string;
}
