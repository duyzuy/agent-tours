import { BaseResponse, Status } from "../common.interface";

export interface ICustomerProfile {
  recId: number;
  userId: number;
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
  status: Status;
  sysFstUser: string;
  sysFstUpdate: string;
  sysBelongTo: string;
  user: {
    recId: number;
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
  idDoi?: string;
  idDoe?: string;
  passportNumber?: string;
  passportDoi?: string;
  passportDoe?: string;
}

export class CustomerProfileFormData implements CustomerProfilePayload {
  fullname?: string;
  dob?: string;
  address?: string;
  district?: string;
  city?: string;
  country?: string;
  idNumber?: string;
  idDoi?: string;
  idDoe?: string;
  passportNumber?: string;
  passportDoi?: string;
  passportDoe?: string;
  constructor(
    fullname: string,
    dob: string,
    address: string,
    district: string,
    city: string,
    country: string,
    idNumber: string,
    idDoi: string | undefined,
    idDoe: string | undefined,
    passportNumber: string,
    passportDoi: string | undefined,
    passportDoe: string | undefined,
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
