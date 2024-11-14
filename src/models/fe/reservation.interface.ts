import { BaseResponse, PaymentStatus, Status } from "../common.interface";
import { IPassengerInformation } from "../management/booking/passengerInformation.interface";
import { ISellable } from "../management/core/sellable.interface";
import { ITemplateSellable } from "../management/core/templateSellable.interface";
export interface FeReservation {
  recId: number;
  bookingOrder: {
    recId: number;
    sellableId: number;
    sellableTemplateId: number;
    custUserId: number;
    custName: string;
    custPhoneNumber: string;
    custEmail: string;
    custAddress: string;
    custInfoJson: string;
    invoiceName: string;
    invoiceCompanyName: string;
    invoiceAddress: string;
    invoiceTaxCode: string;
    invoiceEmail: string;
    paymentStatus: PaymentStatus;
    totalFop: number;
    totalPaid: number;
    totalRefunded: number;
    totalAmount: number;
    tourPrice: number;
    extraPrice: number;
    charge: number;
    referenceId: string;
    referenceName: string;
    rmk: string;
    rmk1: string;
    rmk2: string;
    rmk3: string;
    rmk4: string;
    status: Status;
    sysFstUser: string;
    sysFstUpdate: string;
    sysLstUser: string;
    sysLstUpdate: string;
    sysBelongTo: string;
    logStatus: string;
    template: ITemplateSellable;
    sellable: ISellable;
    fops: [];
    rulesAndPolicies: {
      bookingTimelimits: [];
      depositTimelimits: [];
      penalties: [];
    };
    comments: [];
  };
  bookingDetails: [];
  bookingSsr: [];
  passengers: IPassengerInformation[];
  rulesAndPolicies: {
    bookingTimelimits: [];
    depositTimelimits: [];
    penalties: [];
  };
}
export interface FeReservationResponse extends BaseResponse<FeReservation> {}
