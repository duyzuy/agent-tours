import { BaseResponse, PassengerType } from "@/models/common.interface";

export type RoomingType = "SINGLE" | "DOUBLE" | "TWIN" | "TRIPLE" | "OTHER";

export type RoomingStatusType = "WAITING_FOR_SALES" | "IN_PROGRESS" | "DONE";

export interface RoomingPayload {
  roomingList: { bookingPaxId?: number; roomingListType?: RoomingType; roomingListNumber?: number }[];
}

export interface RoomingHandOverPayload {
  operationId?: number;
  roomingListStatus?: RoomingStatusType;
  roomingListRemark?: string;
}
export interface RoomingItem {
  orderId: number;
  bookingPaxId: number;
  type: PassengerType;
  paxTitle: string;
  paxLastname: string;
  paxMiddleFirstName: string;
  paxGender: string;
  roomingListType: RoomingType;
  roomingListNumber: number;
}

export class RoomingQueryParams {
  sellableId?: number;
  operationId?: number;

  constructor(sellableId: number | undefined, operationId: number | undefined) {
    this.sellableId = sellableId;
    this.operationId = operationId;
  }
}
export interface RoomingListResponse extends BaseResponse<RoomingItem[]> {}
