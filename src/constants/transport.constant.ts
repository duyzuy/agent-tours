import { RoomingType } from "@/models/management/booking/rooming.interface";
export const CAR_TYPES: { label: string; value: string }[] = [
  {
    label: "4 chỗ",
    value: "4seats",
  },
  {
    label: "7 chỗ",
    value: "7_seats",
  },
  {
    label: "9 chỗ",
    value: "9_seats",
  },
  {
    label: "16 chỗ",
    value: "16_seats",
  },
  {
    label: "29 chỗ",
    value: "29_seats",
  },
  {
    label: "35 chỗ",
    value: "35_seats",
  },
  {
    label: "45 chỗ",
    value: "45_seats",
  },
];

export const getCarType = (type?: string) => {
  return CAR_TYPES.find((item) => item.value === type)?.label;
};
