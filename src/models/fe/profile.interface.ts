import { BaseResponse, Status } from "../common.interface";

export interface ICustomerProfile {
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

export interface CustomerProfileResponse extends BaseResponse<ICustomerProfile> {}

export interface CustomerProfilePayload {
  fullname?: string;
  dob?: string;
  address?: string;
  district?: string;
  city?: string;
  country?: string;
  idNumber?: string;
  idDoi?: string | null;
  idDoe?: string | null;
  passportNumber?: string;
  passportDoi?: string | null;
  passportDoe?: string | null;
}

export class CustomerProfileFormData implements CustomerProfilePayload {
  fullname?: string;
  dob?: string;
  address?: string;
  district?: string;
  city?: string;
  country?: string;
  idNumber?: string;
  idDoi?: string | null;
  idDoe?: string | null;
  passportNumber?: string;
  passportDoi?: string | null;
  passportDoe?: string | null;
  constructor(
    fullname: string,
    dob: string,
    address: string,
    district: string,
    city: string,
    country: string,
    idNumber: string,
    idDoi: string | null,
    idDoe: string | null,
    passportNumber: string,
    passportDoi: string | null,
    passportDoe: string | null,
  ) {
    this.fullname = fullname;
    this.dob = dob;
    this.address = address;
    this.district = district;
    this.city = city;
    this.country = country;
    this.idNumber = idNumber;
    this.idDoi = idDoi;
    this.idDoe = idDoe;
    this.passportNumber = passportNumber;
    this.passportDoi = passportDoi;
    this.passportDoe = passportDoe;
  }
}
