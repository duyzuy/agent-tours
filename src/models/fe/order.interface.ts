import { ESellChannel } from "@/constants/channel.constant";
import { BaseResponse, PassengerType, PaymentStatus } from "../common.interface";
import { IDepartLocation } from "../management/cms/miscDepartLocation.interface";
import { IBookingTimeLitmit, IDepositTimelimit, IPenalty } from "../management/core/bookingTimeLimit.interface";
import { IDocument } from "../management/core/document.interface";
import { IFormOfPayment } from "../management/core/formOfPayment.interface";
import { EProductType } from "../management/core/productType.interface";
import { IStock } from "../management/core/stock.interface";
import { IFePassenger } from "./passenger.interface";
import { IInventory } from "../management/core/inventory.interface";
import { ISellable } from "../management/core/sellable.interface";
import { ITemplateSaleableDetailRs, ITemplateSellableDetail } from "../management/core/templateSellable.interface";
import { IDestination } from "../management/region.interface";

export interface IFeOrderDetail {
  bookingOrderId: number;
  bookingOrder: {
    recId: number;
    sellableId: number;
    channel: "B2C" | "B2B";
    agentUserId: 0;
    custName: string;
    custPhoneNumber: string;
    custEmail: string;
    custAddress: string;
    rmk: string;
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
    status: string;
    sysFstUpdate: string;
    sysFstUser: string;
    sysLstUpdate: string;
    sysLstUser: string;
    sellable: ISellable;
    template: Pick<
      ITemplateSellableDetail,
      "recId" | "cmsIdentity" | "type" | "inventoryTypeList" | "code" | "name" | "depart"
    > & {
      destList: IDestination[];
    };
    sellableDetails: {
      inventories: IInventory[];
      stocks: IStock[];
    };
  };
  passengers: IFePassenger[];
  tourBookings: {
    recId: number;
    sellableConfigId: number;
    channel: "CUSTOMER" | "AGENT";
    class: string;
    type: PassengerType;
    quantity: number;
    amount: number;
    paxId: number;
  }[];
  ssrBookings: {
    recId: number;
    refId: number;
    sellableConfigId: number;
    channel: "CUSTOMER" | "AGENT";
    class: string;
    type: PassengerType;
    quantity: number;
    amount: number;
    paxId: number;
    inventoryName: string;
    stock: IStock | null;
  }[];

  fops: IFormOfPayment[];
  rulesAndPolicies: {
    bookingTimelimits: IBookingTimeLitmit[];
    depositTimelimits: IDepositTimelimit[];
    penalties: IPenalty[];
  };
  comments: any[];
}
export interface IFeOrder {
  recId: number;
  sellableId: number;
  channel: "B2B" | "B2C";
  agentUserId: number;
  sellableTemplateId: number;
  custUserId: number;
  custName: string;
  custPhoneNumber: string;
  custEmail: string;
  custAddress: string;
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
  status: "OK" | "XX";
  sysLocalUser: string;
  sysFstUser: string;
  sysFstUpdate: string;
  sysLstUser: string;
  sysLstUpdate: string;
  sysBelongTo: string;
  logStatus: string;
  template: {
    recId: 25;
    cmsIdentity: string;
    type: EProductType;
    code: string;
    name: string;
    inventoryTypeList: string;
    cms: null;
    sellables: null;
    depart: IDepartLocation;
  };
  sellable: {
    recId: number;
    sellableTemplateId: number;
    sellableTemplateCode: string | null;
    type: EProductType;
    code: string;
    cap: string;
    open: string;
    used: string;
    available: string;
    closeDate: string;
    validFrom: string;
    validTo: string;
    startDate: string;
    endDate: string;
  };
}
export interface FeOrderListResponse extends BaseResponse<IFeOrder[]> {}
export interface FeOrderDetailResponse extends BaseResponse<IFeOrderDetail> {}
