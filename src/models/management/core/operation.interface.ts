import { BaseResponse, PassengerType, PaymentStatus } from "@/models/common.interface";
import { ISellable } from "./sellable.interface";
import { ITemplateSellable, ITemplateSellableDetail } from "./templateSellable.interface";
import { EInventoryType } from "./inventoryType.interface";
import { EPassengerGender, EPassengerTitle } from "@/constants/common";
import { RoomingStatusType, RoomingType } from "../booking/rooming.interface";
import { EConfigChannel, ESellChannel } from "@/constants/channel.constant";
import { IDocument } from "./document.interface";

export interface IPic {
  recId: number;
  username: string;
  fullname: string;
  email: string;
  phoneNumber: string;
}
export type IOperationStatus = "NEW" | "DONE" | "ACCEPTED" | "HANDOVERED" | "LOCKED" | "PENDINGCANCELED" | "CANCELED";

export interface IOperation {
  id: number;
  sellableCode: string;
  sellableId: number;
  totalCosting: number;
  totalSale: number;
  pic: IPic | null;
  status: IOperationStatus;
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
    | "endDate"
    | "validFrom"
    | "validTo"
    | "startDate"
  > & {
    configs: null;
    sellableDetails: null;
    promotions: null;
    sellableTemplateCode: null;
  };
  template: Pick<ITemplateSellableDetail, "recId" | "cmsIdentity" | "type" | "code" | "name" | "inventoryTypeList"> & {
    cms: null;
    sellables: null;
    cmsMustKnow: null;
  };
}

export interface IOperationTodoItem {
  type?: EInventoryType; //optional inventoryTypes visa | landpackage| ...
  status?: IOperationStatus;
  numberOfDayFromToday?: number; //default 3 ngày, bắt buộc truyền >= 3
}

export interface OperationPayload {
  id?: number;
  sellableId?: number;
  sellableCode?: string;
  pic?: Partial<IPic>;
  status?: IOperationStatus;
}

export interface OperationStatusOperationIdPayload {
  operationId?: number;
}
export interface OperationStatusSellableIdPayload {
  sellableId?: number;
}

export type OperationStatusPayload = OperationStatusOperationIdPayload | OperationStatusSellableIdPayload;
export interface OperationListResponse extends BaseResponse<IOperation[]> {}
export interface OperationResponse extends BaseResponse<IOperation> {}
export interface OperationStatusResponse
  extends BaseResponse<{
    operationId: number;
    sellableId: number;
    totalCosting: number;
    totalSale: number;
    roomingList: {
      operationId: number;
      sellableId: number;
      roomingListStatus: RoomingStatusType;
      roomingListRemark: string;
      roomingListUpdate: string | null;
    };
    pic: IPic;
    passengerList: {
      paxId: number;
      type: PassengerType;
      paxTitle: EPassengerTitle;
      paxLastname: string;
      paxMiddleFirstName: string;
      paxGender: EPassengerGender;
      roomingListType: RoomingType;
      roomingListNumber: number;
      documents: null | IDocument[];
    }[];
    orderList: {
      id: number;
      channel: ESellChannel;
      custName: string;
      custPhoneNumber: string;
      paymentStatus: PaymentStatus;
      totalPaid: number;
      totalAmount: number;
    }[];
  }> {}
export interface OperationTodoListResponse extends BaseResponse<IOperationTodoItem[]> {}
