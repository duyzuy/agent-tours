import { EPassengerGender, EPassengerTitle } from "@/constants/common";

export interface UpdateCustomerContactPayload {
  bookingOrder?: {
    recId?: number;
    custName?: string;
    custPhoneNumber?: string;
    custEmail?: string;
    custAddress?: string;
    rmk?: string;
  };
}

export interface UpdateInvoincePayload {
  bookingOrder?: {
    recId?: number;
    custName?: string;
    custPhoneNumber?: string;
    custEmail?: string;
    custAddress?: string;
    rmk?: string;
  };
}

export interface UpdatePassengerInformationPayload {
  bookingOrderId: number;
  pax?: {
    recId?: number;
    paxTitle?: string;
    paxLastname?: string;
    paxMiddleFirstName?: string;
    paxGender?: EPassengerGender;
    paxBirthDate?: string;
    paxBirthYear?: number;
    paxPhoneNumber?: string;
    paxAddress?: string;
    paxIdNumber?: string;
    paxNationality?: string;
    paxPassportNumber?: string;
    paxPassortExpiredDate?: string;
    paxInfoJson?: string;
  };
}

export class CustomerContactInformationFormData {
  recId: number;
  custName: string;
  custPhoneNumber: string;
  custEmail: string;
  custAddress: string;
  rmk: string;
  constructor(
    recId: number,
    custName: string,
    custPhoneNumber: string,
    custEmail: string,
    custAddress: string,
    rmk: string,
  ) {
    this.recId = recId;
    this.custName = custName;
    this.custPhoneNumber = custPhoneNumber;
    this.custEmail = custEmail;
    this.custAddress = custAddress;
    this.rmk = rmk;
  }
}

export class InvoinceFormData {
  recId: number;
  invoiceName: string;
  invoiceCompanyName: string;
  invoiceAddress: string;
  invoiceTaxCode: string;
  invoiceEmail: string;
  constructor(
    recId: number,
    invoiceName: string,
    invoiceCompanyName: string,
    invoiceAddress: string,
    invoiceTaxCode: string,
    invoiceEmail: string,
  ) {
    this.recId = recId;
    this.invoiceName = invoiceName;
    this.invoiceCompanyName = invoiceCompanyName;
    this.invoiceAddress = invoiceAddress;
    this.invoiceTaxCode = invoiceTaxCode;
    this.invoiceEmail = invoiceEmail;
  }
}

export class PassengerInformationFormData {
  recId?: number;
  paxTitle?: EPassengerTitle;
  paxLastname?: string;
  paxMiddleFirstName?: string;
  paxGender?: EPassengerGender;
  paxBirthDate?: string;
  paxBirthYear?: number;
  paxPhoneNumber?: string;
  paxAddress?: string;
  paxIdNumber?: string;
  paxNationality?: string;
  paxPassportNumber?: string;
  paxPassortExpiredDate?: string;
  paxInfoJson?: string;
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
    paxInfoJson: string | undefined,
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
