import { BaseResponse, Status } from "./common.interface";

export interface ICustomerLoginPayload {
    faceBookId?: string;
    googleId?: string;
    username?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
}

export interface ICusTomerRegisterPayload {
    faceBookId?: string;
    googleId?: string;
    username?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
}

export interface ICustomerAuthInformation {
    recId: number;
    faceBookId: string;
    googleId: string;
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    status: Status;
    sysBelongTo: string;
    sysFstUpdate: string;
    sysFstUser: string;
    webSession: string;
}
export interface ICustomerProfile {
    fullname: string;
    dob: string;
    address: string;
    district: string;
    city: string;
    country: string;
    idNumber: string;
    idDoi: string;
    idDoe: string;
    passportNumber: string;
    passportDoi: string;
    passportDoe: string;
}

export interface CustomerLoginResponse extends BaseResponse<string> {}

export interface CustomerInformationResponse
    extends BaseResponse<ICustomerAuthInformation> {}
