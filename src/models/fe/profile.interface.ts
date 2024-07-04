import { BaseResponse, Status } from "../common.interface";

export interface IProfile {
    recId: number;
    userId: number;
    fullname: string;
    dob: string | null;
    address: string;
    district: string;
    city: string;
    country: string;
    idNumber: string;
    idDoi: null;
    idDoe: null;
    passportNumber: string;
    passportDoi: null;
    passportDoe: null;
    status: Status;
    sysFstUser: string;
    sysFstUpdate: string;
    sysBelongTo: string;
    user: {
        recId: 3;
        faceBookId: string;
        googleId: string;
        username: string;
        email: string;
        phoneNumber: string;
        webSession: string;
    };
}

export interface FeUserProfileResponse extends BaseResponse<IProfile> {}
