import { BaseResponse } from "../common.interface";

export enum ELocalUserType {
  ADMIN = "ADMIN",
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
export type ILocalUserMinimal = Pick<ILocalUser, "recId" | "userType" | "fullname" | "email" | "phoneNumber">;

export interface ILocalUserList extends BaseResponse<ILocalUser[]> {}
export interface UserAgentListResponse extends BaseResponse<ILocalUserMinimal[]> {}

export interface ILocalUserPayload {
  username?: string;
  fullname?: string;
  infoEmail?: string;
  password?: string;
  phoneNumber?: string;
  userType: ELocalUserType;
  email?: string;
  mainRole?: string;
  mainRoleName?: string;
  descriptions?: string;
  infoCompanyName?: string;
  infoLegalRepresentative?: string;
  infoPosition?: string;
  infoPhoneNumber?: string;
  infoAddress?: string;
  infoTaxcode?: string;
  infoBanking?: string;
  infoSpecialNote?: string;
  status: "OK" | "XX" | "OX";
}

export class LocalUserPayLoad implements ILocalUserPayload {
  username: string;
  fullname: string;
  infoEmail: string;
  phoneNumber: string;
  email: string;
  userType: ELocalUserType;
  status: "OK" | "XX" | "OX";
  password: string;
  mainRole: string;
  mainRoleName: string;
  descriptions: string;
  infoCompanyName: string;
  infoLegalRepresentative: string;
  infoPosition: string;
  infoPhoneNumber: string;
  infoAddress: string;
  infoTaxcode: string;
  infoBanking: string;
  infoSpecialNote: string;

  constructor(
    username: string,
    fullname: string,
    infoEmail: string,
    password: string,
    phoneNumber: string,
    email: string,
    status: "OK" | "XX" | "OX",
    mainRole: string,
    mainRoleName: string,
    descriptions: string,
    infoCompanyName: string,
    infoLegalRepresentative: string,
    infoPosition: string,
    infoPhoneNumber: string,
    infoAddress: string,
    infoTaxcode: string,
    infoBanking: string,
    infoSpecialNote: string,
  ) {
    this.username = username;
    this.fullname = fullname;
    this.infoEmail = infoEmail;
    this.password = password;
    this.mainRole = mainRole;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.mainRoleName = mainRoleName;
    this.descriptions = descriptions;
    this.infoCompanyName = infoCompanyName;
    this.infoLegalRepresentative = infoLegalRepresentative;
    this.infoPosition = infoPosition;
    this.infoPhoneNumber = infoPhoneNumber;
    this.infoAddress = infoAddress;
    this.infoTaxcode = infoTaxcode;
    this.infoBanking = infoBanking;
    this.infoSpecialNote = infoSpecialNote;
    this.status = status;
    this.userType = ELocalUserType.ADMIN;
  }
}

export interface ILocalUserChangePasswordPayLoad {
  username: string;
  newPassword: string;
}

export interface ILocalUserChangePasswordFormData extends ILocalUserChangePasswordPayLoad {
  confirmPassword: string;
}
