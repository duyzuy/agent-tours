import {
  ELocalUserType,
  ILocalUserPayload,
  LocalUserNewPasswordPayload,
} from "@/models/management/localUser.interface";

export class LocalUserFormData implements ILocalUserPayload {
  username?: string;
  fullname?: string;
  infoEmail?: string;
  phoneNumber?: string;
  email?: string;
  userType?: ELocalUserType;
  status?: "OK" | "XX" | "OX";
  password?: string;
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

  constructor(
    username: string | undefined,
    userType: ELocalUserType | undefined,
    fullname: string | undefined,
    infoEmail: string | undefined,
    password: string | undefined,
    phoneNumber: string | undefined,
    email: string | undefined,
    status: "OK" | "XX" | "OX" | undefined,
    mainRole: string | undefined,
    mainRoleName: string | undefined,
    descriptions: string | undefined,
    infoCompanyName: string | undefined,
    infoLegalRepresentative: string | undefined,
    infoPosition: string | undefined,
    infoPhoneNumber: string | undefined,
    infoAddress: string | undefined,
    infoTaxcode: string | undefined,
    infoBanking: string | undefined,
    infoSpecialNote: string | undefined,
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
    this.userType = userType;
  }
}

export class LocalUserChangePasswordFormData implements LocalUserNewPasswordPayload {
  username?: string;
  newPassword?: string;
  confirmPassword?: string;

  constructor(username: string | undefined, newPassword: string | undefined, confirmPassword: string) {
    this.username = username;
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;
  }
}
