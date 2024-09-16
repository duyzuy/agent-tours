import { RoomingItem, RoomingPayload, RoomingType } from "@/models/management/booking/rooming.interface";

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
