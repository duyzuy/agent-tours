import { BaseQueryParams, BaseResponse, PassengerType, PaymentStatus, Status } from "../../common.interface";
import { ITemplateSellableDetail } from "../core/templateSellable.interface";
import { ISellable } from "../core/sellable.interface";
import { IFormOfPayment } from "../core/formOfPayment.interface";
import { IBookingTimeLitmit, IDepositTimelimit } from "../core/bookingTimeLimit.interface";
import { EConfigChannel, EConfigClass, ESellChannel } from "@/constants/channel.constant";
import { IInventory } from "../core/inventory.interface";
import { IStock } from "../core/stock.interface";
import { EPassengerGender, EPassengerTitle } from "@/constants/common";
import { RoomingType } from "./rooming.interface";
import { IDocument } from "../core/document.interface";
import { IComment } from "./comment.interface";
import { EProductType } from "../core/productType.interface";

export interface IOrderDetail {
  bookingOrderId: number;
  bookingOrder: {
    recId: number;
    sellableId: number;
    channel: ESellChannel;
    agentUserId: number;
    custName: string;
    custPhoneNumber: string;
    custEmail: string;
    custAddress: string;
    rmk: string;
    paymentStatus: PaymentStatus;
    totalFop: number;
    totalPaid: number;
    totalRefunded: number;
    totalAmount: number;
    tourPrice: number;
    invoiceName: string;
    invoiceCompanyName: string;
    invoiceAddress: string;
    invoiceTaxCode: string;
    invoiceEmail: string;
    extraPrice: number;
    charge: number;
    referenceId: string;
    referenceName: string;
    sysFstUpdate: string;
    sysFstUser: string | null;
    sysLstUpdate: string;
    sysLstUser: string | null;
    sellable: Pick<
      ISellable,
      | "recId"
      | "sellableTemplateId"
      | "type"
      | "code"
      | "cap"
      | "open"
      | "used"
      | "available"
      | "closeDate"
      | "validFrom"
      | "validTo"
      | "startDate"
      | "endDate"
    > & { sellableTemplateCode: string | null };
    template: Pick<
      ITemplateSellableDetail,
      "recId" | "inventoryTypeList" | "cmsIdentity" | "type" | "code" | "depart" | "destListJson" | "name"
    >;
    sellableDetails: {
      inventories: IInventory[];
      stocks: (Pick<
        IStock,
        "recId" | "code" | "type" | "inventoryType" | "description" | "cap" | "open" | "used" | "available"
      > & { inventory: IInventory })[];
    };
    status: Status;
  };
  passengers: {
    recId: number;
    type: PassengerType;
    paxTitle: EPassengerTitle;
    paxLastname: string;
    paxMiddleFirstName: string;
    paxGender: EPassengerGender;
    paxBirthDate: string;
    paxBirthYear: 0;
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
  }[];
  tourBookings: {
    recId: number;
    channel: EConfigChannel;
    sellableConfigId: number;
    class: EConfigClass;
    type: PassengerType;
    quantity: number;
    amount: number;
    paxId: number;
  }[];
  ssrBookings:
    | {
        recId: number;
        refId: number;
        sellableConfigId: number;
        channel: EConfigChannel;
        class: EConfigClass;
        type: PassengerType;
        quantity: number;
        amount: number;
        paxId: number;
        inventoryName: string;
        stock: string;
      }[]
    | null;
  fops: IFormOfPayment[];
  rulesAndPolicies: {
    bookingTimelimits: IBookingTimeLitmit[];
    depositTimelimits: IDepositTimelimit[];
    penalties: [];
  };
  comments: IComment[];
}

export type IOrderItem = Pick<
  IOrderDetail["bookingOrder"],
  | "recId"
  | "sellableId"
  | "channel"
  | "agentUserId"
  | "custName"
  | "custEmail"
  | "custPhoneNumber"
  | "paymentStatus"
  | "totalFop"
  | "totalPaid"
  | "totalRefunded"
  | "totalAmount"
  | "tourPrice"
  | "extraPrice"
  | "charge"
  | "referenceId"
  | "referenceName"
  | "sellable"
  | "template"
> & {};

export class BookingOrderListQueryParams
  implements BaseQueryParams<{ createdFrom?: string; createdTo?: string; status?: Status }>
{
  requestObject?: {
    type?: EProductType;
    channel?: string;
    paymentStatus?: string;
    createdFrom?: string;
    createdTo?: string;
    status?: Status;
  };
  orderBy?: { sortColumn?: string; direction?: "asc" | "desc" } | undefined;
  pageCurrent: number;
  pageSize: number;
  constructor(
    requestObject:
      | {
          type?: EProductType;
          channel?: string;
          paymentStatus?: string;
          createdFrom?: string;
          createdTo?: string;
          status?: Status;
        }
      | undefined,

    pageCurrent: number,
    pageSize: number,
    orderBy?: { sortColumn?: string; direction?: "asc" | "desc" } | undefined,
  ) {
    this.requestObject = requestObject;
    this.pageCurrent = pageCurrent;
    this.pageSize = pageSize;
    this.orderBy = orderBy ? orderBy : { sortColumn: undefined, direction: "desc" };
  }
}

export interface AddNewSSRNoPaxPayload {
  bookingOrderId?: number;
  newSSR?: {
    sellableConfigId: number;
    qty: number;
    amount: number;
    type: PassengerType;
  }[];
}
export interface AddNewSSRByPaxPayload {
  bookingOrderId?: number;
  ssrList?: {
    paxId?: number;
    newSSR?: {
      sellableConfigId: number;
      qty: number;
      amount: number;
      type: PassengerType;
    }[];
  }[];
}

export interface DeleteSSRPayload {
  bookingOrderId?: number;
  deleteSSR?: {
    bookingId: number;
    sellableConfigId: number;
  }[];
}

export interface IOrderListRs extends BaseResponse<IOrderItem[]> {}
export interface IOrderDetailRs extends BaseResponse<IOrderDetail> {}
