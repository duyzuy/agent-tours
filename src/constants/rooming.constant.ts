import { RoomingType } from "@/models/management/booking/rooming.interface";
export const ROOM_TYPES: { label: string; value: RoomingType }[] = [
  {
    label: "Phòng đơn",
    value: "SINGLE",
  },
  {
    label: "Phòng giường đôi",
    value: "DOUBLE",
  },
  {
    label: "Phòng 2 giường đơn",
    value: "TWIN",
  },
  {
    label: "Phòng 3 người",
    value: "TRIPLE",
  },
  {
    label: "Khác",
    value: "OTHER",
  },
];

export const getRoomingName = (type?: RoomingType) => {
  return ROOM_TYPES.find((item) => item.value === type)?.label;
};
