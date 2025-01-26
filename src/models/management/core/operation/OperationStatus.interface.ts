import { BaseResponse } from "@/models/common.interface";
import { RoomingStatusType, RoomingType } from "../../booking/rooming.interface";
import { IPersonInCharge } from "./PersonInCharge.interface";
import { IDocument } from "../document.interface";
import { IOrderItem } from "../../booking/order.interface";
import { IPassengerInformation } from "../../booking/passengerInformation.interface";

export interface OperationStatusDetail {
  operationId: number;
  sellableId: number;
  totalCosting: number;
  totalSale: number;
  numberDutyBookingRequired: number;
  dutyBookingList:
    | { dutyBookingId: number; sellableId: number; supplier: null; remark: string; status: string }[]
    | null;
  roomingList: {
    operationId: number;
    sellableId: number;
    roomingListStatus: RoomingStatusType;
    roomingListRemark: string;
    roomingListUpdate: string | null;
  };
  pic: IPersonInCharge;
  passengerList: (Pick<
    IPassengerInformation,
    "type" | "paxLastname" | "paxMiddleFirstName" | "paxGender" | "paxTitle"
  > & {
    paxId: number;
    roomingListType: RoomingType;
    roomingListNumber: number;
    documents: null | IDocument[];
  })[];
  orderList: (Pick<
    IOrderItem,
    "channel" | "custName" | "custPhoneNumber" | "paymentStatus" | "totalPaid" | "totalAmount"
  > & {
    id: number;
  })[];
}

export interface OperationStatusResponse extends BaseResponse<OperationStatusDetail> {}

export interface OperationStatusOperationIdPayload {
  operationId?: number;
}
export interface OperationStatusSellableIdPayload {
  sellableId?: number;
}

export type OperationStatusPayload = OperationStatusOperationIdPayload | OperationStatusSellableIdPayload;
