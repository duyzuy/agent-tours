import { EPassengerGender, EPassengerTitle } from "@/constants/common";
import { PassengerType } from "../common.interface";
import { IDocument } from "../management/core/document.interface";
import { RoomingType } from "../management/booking/rooming.interface";

export interface IFePassenger {
  recId: number;
  type: PassengerType;
  paxTitle: EPassengerTitle;
  paxLastname: string;
  paxMiddleFirstName: string;
  paxGender: EPassengerGender;
  paxBirthDate: string;
  paxPhoneNumber: string;
  paxAddress: string;
  paxIdNumber: string;
  paxNationality: string;
  paxPassportNumber: string;
  paxPassortExpiredDate: string;
  paxInfoJson: string;
  roomingListType: RoomingType;
  roomingListNumber: number;
  documents: IDocument[];
}
