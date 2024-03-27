import { BaseResponse } from "./common.interface";

export interface ILocalUserProfilePayload {
    infoCompanyName?: string;
    infoLegalRepresentative?: string;
    infoPosition?: string;
    infoPhoneNumber?: string;
    infoEmail?: string;
    infoAddress?: string;
    infoTaxcode?: string;
    infoBanking?: string;
    infoSpecialNote?: string;
}

export interface ILocalUserProfile {
    recId: number;
    userId: string;
    username: string;
    password: string;
    privateKey: string;
    email: string;
    phoneNumber: string;
    infoEmail: string;
    mainRole: string;
    mainRoleName: string;
    userType: "ADMIN" | "AGENT" | "STAFF";
    fullname: string;
    descriptions: string;
    infoCompanyName: string;
    infoLegalRepresentative: string;
    infoPosition: string;
    infoPhoneNumber: string;
    infoAddress: string;
    infoTaxcode: string;
    infoBanking: string;
    infoSpecialNote: string;
    status: string;
    sysFstUser: string;
    sysFstUpdate: string;
    sysBelongTo: string;
}
export interface ILocalUserProfileRs extends BaseResponse<ILocalUserProfile> {}
export interface ILocalProfileErr extends BaseResponse<string> {}

export interface IAgLoginRs extends BaseResponse<string> {}
export interface IAgLoginErr extends BaseResponse<null> {}

export interface IAgLoginPayload {
    userId: string;
    username: string;
    password: string;
}
