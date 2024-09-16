import { BaseResponse, PassengerType } from "@/models/common.interface";

export type RoomingType = "SINGLE" | "DOUBLE" | "TWIN" | "TRIPLE" | "OTHER";

export interface RoomingPayload {
  roomingList: { bookingPaxId?: number; roomingListType?: RoomingType; roomingListNumber?: number }[];
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

export interface RoomingListResponse extends BaseResponse<RoomingItem[]> {}
