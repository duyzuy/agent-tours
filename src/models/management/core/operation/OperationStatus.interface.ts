import { BaseResponse } from "@/models/common.interface";
import { RoomingStatusType, RoomingType } from "../../booking/rooming.interface";
import { IPersonInCharge } from "./personInCharge.interface";
import { IDocument } from "../document.interface";
import { IOrderItem } from "../../booking/order.interface";
import { IPassengerInformation } from "../../booking/passengerInformation.interface";
import { EInventoryType } from "../inventoryType.interface";

export interface OperationStatusDetail {
  operationId: number;
  sellableId: number;
  totalCosting: number;
  totalSale: number;
  numberDutyBookingRequired: number;
  dutyBookingList:
    | {
        dutyBookingId: number;
        sellableId: number;
        supplier: {
          recId: number;
          shortname: string;
          fullname: string;
        };
        remark: string;
        status: "OK" | "XX";
      }[]
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
    documents: IDocument[] | null;
    passengerDeadlineRemarks:
      | {
          recId: number;
          sellableId: number;
          paxId: number;
          deadlineId: number;
          deadlineType: EInventoryType;
          remark: string;
        }[]
      | null;
  })[];
  orderList: (Pick<
    IOrderItem,
    "channel" | "custName" | "custPhoneNumber" | "paymentStatus" | "totalPaid" | "totalAmount"
  > & {
    id: number;
  })[];
}

export interface OperationStatusResponse extends BaseResponse<OperationStatusDetail> {}

export type OperationStatusQueryParams = { operationId: number } | { sellableId: number };
