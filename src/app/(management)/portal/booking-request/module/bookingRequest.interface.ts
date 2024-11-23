import { BookingRequestPayload } from "@/models/management/bookingRequest/bookingRequest.interface";

export class BookingRequestFormData implements BookingRequestPayload {
  requestId?: number;
  requestName?: string;
  startDate?: string;
  endDate?: string;
  custName?: string; //name + phone bắt buộc
  custPhoneNumber?: string; //name + phone bắt buộc
  custEmail?: string;
  custAddress?: string;
  referenceId?: string;
  referenceName?: string; //chưa dùng tới
  tourPrice?: number;
  extraPrice?: number;
  invoiceName?: string;
  invoiceCompanyName?: string;
  invoiceAddress?: string;
  invoiceTaxCode?: string;
  invoiceEmail?: string;
  rmk?: string; //yêu cầu + ghi chu BẮT BUỘC

  constructor(
    requestId: number | undefined,
    requestName: string | undefined,
    startDate: string | undefined,
    endDate: string | undefined,
    custName: string,
    custPhoneNumber: string,
    custEmail: string | undefined,
    custAddress: string | undefined,
    referenceId: string | undefined,
    referenceName: string,
    tourPrice: number | undefined,
    extraPrice: number | undefined,
    invoiceName: string | undefined,
    invoiceCompanyName: string | undefined,
    invoiceAddress: string | undefined,
    invoiceTaxCode: string | undefined,
    invoiceEmail: string | undefined,
    rmk: string | undefined,
  ) {
    this.requestId = requestId;
    this.requestName = requestName;
    this.startDate = startDate;
    this.endDate = endDate;
    this.custName = custName;
    this.custPhoneNumber = custPhoneNumber;
    this.custEmail = custEmail;
    this.custAddress = custAddress;
    this.referenceId = referenceId;
    this.referenceName = referenceName;
    this.tourPrice = tourPrice;
    this.extraPrice = extraPrice;
    this.invoiceName = invoiceName;
    this.invoiceCompanyName = invoiceCompanyName;
    this.invoiceAddress = invoiceAddress;
    this.invoiceTaxCode = invoiceTaxCode;
    this.invoiceEmail = invoiceEmail;
    this.rmk = rmk;
  }
}
