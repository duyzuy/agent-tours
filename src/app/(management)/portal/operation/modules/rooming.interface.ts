import { RoomingItem, RoomingType, RoomingStatusType } from "@/models/management/booking/rooming.interface";

export class RoomingFormData {
  roomingType?: RoomingType;
  roomingItems: RoomingItem[];
  roomingNumber: number;

  constructor(roomingType: RoomingType | undefined, roomingNumber: number, roomingItems: RoomingItem[]) {
    this.roomingItems = roomingItems;
    this.roomingNumber = roomingNumber;
    this.roomingType = roomingType;
  }
}

export class RoomingHandOverFormData {
  operationId?: number;
  roomingListStatus?: RoomingStatusType;
  roomingListRemark?: string;
  constructor(
    operationId: number | undefined,
    roomingListStatus: RoomingStatusType | undefined,
    roomingListRemark: string | undefined,
  ) {
    this.operationId = operationId;
    this.roomingListStatus = roomingListStatus;
    this.roomingListRemark = roomingListRemark;
  }
}
