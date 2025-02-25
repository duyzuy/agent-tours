import { EPassengerGender, EPassengerTitle } from "@/constants/common";
export class PassengerInformationFormData {
  paxTitle?: EPassengerTitle;
  paxGender?: EPassengerGender;
  paxLastname?: string;
  paxMiddleFirstName?: string;
  paxBirthDate?: string;
  paxPhoneNumber?: string;
  paxAddress?: string;
  paxIdNumber?: string;
  paxNationality?: string;
  paxPassportNumber?: string;
  paxPassortExpiredDate?: string;
  constructor(
    paxTitle: EPassengerTitle | undefined,
    paxGender: EPassengerGender | undefined,
    paxLastname: string | undefined,
    paxMiddleFirstName: string | undefined,
    paxBirthDate: string | undefined,
    paxPhoneNumber: string | undefined,
    paxAddress: string | undefined,
    paxIdNumber: string | undefined,
    paxNationality: string | undefined,
    paxPassportNumber: string | undefined,
    paxPassortExpiredDate: string | undefined,
  ) {
    this.paxTitle = paxTitle;
    this.paxGender = paxGender;
    this.paxLastname = paxLastname;
    this.paxMiddleFirstName = paxMiddleFirstName;
    this.paxBirthDate = paxBirthDate;
    this.paxPhoneNumber = paxPhoneNumber;
    this.paxAddress = paxAddress;
    this.paxIdNumber = paxIdNumber;
    this.paxNationality = paxNationality;
    this.paxPassportNumber = paxPassportNumber;
    this.paxPassortExpiredDate = paxPassortExpiredDate;
  }
}
