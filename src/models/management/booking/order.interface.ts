import { BaseResponse, PaymentStatus } from "../../common.interface";
import { Status } from "../../common.interface";
import { ITemplateSellableDetail } from "../core/templateSellable.interface";
import { ISellable } from "../core/sellable.interface";
import { PriceConfig } from "../core/priceConfig.interface";
import { IReservation } from "./reservation.interface";
import { IFormOfPayment } from "../core/formOfPayment.interface";
import { IBookingTimeLitmit, IDepositTimelimit } from "../core/bookingTimeLimit.interface";

export interface IOrderItem {
  recId: number;
  sellableId: number;
  sellableTemplateId: number;
  custName: string;
  channel: string;
  agentUserId: number;
  custPhoneNumber: string;
  custEmail: string;
  custAddress: string;
  custInfoJson: string;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  totalFop: number;
  totalPaid: number;
  totalRefunded: number;
  tourPrice: number;
  extraPrice: number;
  charge: number;
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
  template: ITemplateSellableDetail;
  sellable: ISellable & {
    configs: PriceConfig[] | null;
    template: ITemplateSellableDetail;
  };
  invoiceName: string;
  invoiceCompanyName: string;
  invoiceAddress: string;
  invoiceTaxCode: string;
  invoiceEmail: string;
  fops: IFormOfPayment[];
  rulesAndPolicies: {
    bookingTimelimits: IBookingTimeLitmit[];
    depositTimelimits: IDepositTimelimit[];
    penalties: [];
  };
  referenceId: string;
  referenceName: string;
}

export interface IOrderListRs extends BaseResponse<IOrderItem[]> {}

export interface IOrderDetail extends IReservation {
  fops: IFormOfPayment[];
  rulesAndPolicies: {
    bookingTimelimits: IBookingTimeLitmit[];
    depositTimelimits: IDepositTimelimit[];
    penalties: [];
  };
}
export interface IOrderDetailRs extends BaseResponse<IOrderDetail> {}
