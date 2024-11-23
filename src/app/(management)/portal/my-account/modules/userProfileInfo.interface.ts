import { ILocalUserProfilePayload } from "@/models/management/localAuth.interface";
import { LocalUserNewPasswordPayload } from "@/models/management/localUser.interface";
export class LocalUserProfileFormData implements ILocalUserProfilePayload {
  infoCompanyName?: string;
  infoLegalRepresentative?: string;
  infoPosition?: string;
  infoPhoneNumber?: string;
  infoEmail?: string;
  infoAddress?: string;
  infoTaxcode?: string;
  infoBanking?: string;
  infoSpecialNote?: string;

  constructor(
    infoCompanyName: string | undefined,
    infoLegalRepresentative: string | undefined,
    infoPosition: string | undefined,
    infoPhoneNumber: string | undefined,
    infoEmail: string | undefined,
    infoAddress: string | undefined,
    infoTaxcode: string | undefined,
    infoBanking: string | undefined,
    infoSpecialNote: string | undefined,
  ) {
    this.infoCompanyName = infoCompanyName;
    this.infoLegalRepresentative = infoLegalRepresentative;
    this.infoPosition = infoPosition;
    this.infoPhoneNumber = infoPhoneNumber;
    this.infoEmail = infoEmail;
    this.infoAddress = infoAddress;
    this.infoTaxcode = infoTaxcode;
    this.infoBanking = infoBanking;
    this.infoSpecialNote = infoSpecialNote;
  }
}

export class ChangePasswordFormData {
  username?: string;
  newPassword?: string;
  confirmPassword?: string;

  constructor(username: string | undefined, newPassword: string | undefined, confirmPassword: string | undefined) {
    this.username = username;
    this.confirmPassword = confirmPassword;
    this.newPassword = newPassword;
  }
}
