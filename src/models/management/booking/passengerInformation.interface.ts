import { EPassengerGender, EPassengerTitle } from "@/constants/common";
import { PassengerType, Status } from "../../common.interface";
import { IDocument } from "../core/document.interface";

export interface IPassengerInformation {
  recId: number;
  bookingId: number;
  orderId: number;
  paxTitle: EPassengerTitle;
  type: PassengerType;
  paxLastname: string;
  paxMiddleFirstName: string;
  paxGender: EPassengerGender;
  paxBirthDate: string;
  paxBirthYear: number;
  paxPhoneNumber: string;
  paxAddress: string;
  paxIdNumber: string;
  paxNationality: string;
  paxPassportNumber: string;
  paxPassortExpiredDate: string;
  paxInfoJson: string;
  status: Status;
  sysFstUser: string;
  sysFstUpdate: string;
  sysLstUser: string;
  sysLstUpdate: string;
  sysBelongTo: string;
  logStatus: string;
  documents: IDocument[] | null;
}

export class PassengerInformationFormData implements Partial<IPassengerInformation> {
  recId: number;
  paxTitle?: EPassengerTitle;
  paxLastname: string;
  paxMiddleFirstName: string;
  paxGender: EPassengerGender;
  paxBirthDate: string;
  paxBirthYear: number;
  paxPhoneNumber: string;
  paxAddress: string;
  paxIdNumber: string;
  paxNationality: string;
  paxPassportNumber: string;
  paxPassortExpiredDate: string;
  paxInfoJson: string;
  constructor(
    recId: number,
    paxTitle: EPassengerTitle | undefined,
    paxLastname: string,
    paxMiddleFirstName: string,
    paxGender: EPassengerGender,
    paxBirthDate: string,
    paxBirthYear: number,
    paxPhoneNumber: string,
    paxAddress: string,
    paxIdNumber: string,
    paxNationality: string,
    paxPassportNumber: string,
    paxPassortExpiredDate: string,
    paxInfoJson: string,
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
    this.paxInfoJson = paxInfoJson;
  }
}
