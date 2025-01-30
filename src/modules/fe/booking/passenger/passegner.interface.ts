import { EPassengerGender, EPassengerTitle } from "@/constants/common";
export class FePassengerInformationFormData {
  recId?: number;
  paxTitle?: EPassengerTitle;
  paxLastname?: string;
  paxMiddleFirstName?: string;
  paxGender?: EPassengerGender;
  paxBirthDate?: string | undefined;
  paxBirthYear?: number;
  paxPhoneNumber?: string;
  paxAddress?: string;
  paxIdNumber?: string;
  paxNationality?: string;
  paxPassportNumber?: string;
  paxPassortExpiredDate?: string;

  constructor(
    recId: number | undefined,
    paxTitle: EPassengerTitle | undefined,
    paxLastname: string | undefined,
    paxMiddleFirstName: string | undefined,
    paxGender: EPassengerGender | undefined,
    paxBirthDate: string | undefined,
    paxBirthYear: number | undefined,
    paxPhoneNumber: string | undefined,
    paxAddress: string | undefined,
    paxIdNumber: string | undefined,
    paxNationality: string | undefined,
    paxPassportNumber: string | undefined,
    paxPassortExpiredDate: string | undefined,
  ) {
    this.recId = recId;
    this.paxTitle = paxTitle;
    this.paxLastname = paxLastname;
    this.paxMiddleFirstName = paxMiddleFirstName;
    this.paxGender = paxGender;
    this.paxBirthDate = paxBirthDate;
    this.paxBirthYear = paxBirthYear;
    this.paxPhoneNumber = paxPhoneNumber;
    this.paxAddress = paxAddress;
    this.paxIdNumber = paxIdNumber;
    this.paxNationality = paxNationality;
    this.paxPassportNumber = paxPassportNumber;
    this.paxPassortExpiredDate = paxPassortExpiredDate;
  }
}
