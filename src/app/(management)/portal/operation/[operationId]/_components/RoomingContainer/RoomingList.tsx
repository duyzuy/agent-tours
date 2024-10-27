import { RoomingItem, RoomingType } from "@/models/management/booking/rooming.interface";
import { Checkbox, Tag, TagProps } from "antd";
import { EPassengerGender, EPassengerTitle } from "@/constants/common";
import { getPassengerTitle, getPassengerGender } from "@/constants/common";
import { getRoomingName, ROOM_TYPES } from "@/constants/rooming.constant";
import { getPassengerType } from "@/utils/common";
import { useMemo } from "react";
export interface RoomingListProps {
  items: RoomingItem[];
  value?: RoomingItem[];
  onChange?: (item: RoomingItem, items: RoomingItem[]) => void;
  isEditable?: boolean;
}
const RoomingList: React.FC<RoomingListProps> = ({ items, value, onChange, isEditable }) => {
  const roomGroupByPax = useMemo(() => {
    return items?.reduce<{ [key: string]: RoomingItem[] }>((acc, item) => {
      return {
        ...acc,
        [item.roomingListNumber]: [...(acc[item.roomingListNumber] || []), item],
      };
    }, {});
  }, [items]);

  const hasSelectedPaxItem = (item: RoomingItem) => {
    return value?.some((roomingItem) => roomingItem.bookingPaxId === item.bookingPaxId);
  };

  const getFullName = (lastName?: string, middleAndFirstname?: string) => {
    if (!lastName) {
      return "--";
    }

    return `${lastName}, ${middleAndFirstname}`;
  };

  const onChangeRoomingItem = (roomingItem: RoomingItem) => {
    let newValues = [...(value || [])];

    const indexItem = newValues.findIndex((item) => item.bookingPaxId === roomingItem.bookingPaxId);

    if (indexItem !== -1) {
      newValues.splice(indexItem, 1);
    } else {
      newValues = [...newValues, roomingItem];
    }

    onChange?.(roomingItem, newValues);
  };

  const getRoomingColor = (type: RoomingType): TagProps["color"] => {
    return type === "DOUBLE"
      ? "volcano"
      : type === "TRIPLE"
      ? "blue"
      : type === "SINGLE"
      ? "green"
      : type === "TWIN"
      ? "cyan"
      : undefined;
  };

  return (
    <div className="rooming-list w-fit">
      <div className="flex items-center bg-slate-50 rounded-md py-2 px-4">
        <div className="w-20">Chọn</div>
        <div className="w-20">Order ID</div>
        <div className="w-36">Danh xưng</div>
        <div className="w-56">Họ và tên</div>
        <div className="w-28">Hành khách</div>
        <div className="w-24">Giới tính</div>
        <div className="w-36">Loại phòng</div>
      </div>
      {roomGroupByPax
        ? Object.entries(roomGroupByPax).map(([key, roomingItem], _index) => (
            <div className="mb-2 pb-2 border-b px-4" key={_index}>
              {roomingItem?.map((paxItem) => (
                <div className="pax-item flex items-center py-2" key={paxItem.bookingPaxId}>
                  <div className="w-20">
                    <Checkbox
                      checked={hasSelectedPaxItem(paxItem)}
                      onChange={() => onChangeRoomingItem(paxItem)}
                      disabled={!isEditable}
                    ></Checkbox>
                  </div>
                  <div className="w-20">{`#${paxItem.orderId}`}</div>
                  <div className="w-36">{getPassengerTitle(paxItem.paxTitle as EPassengerTitle)}</div>
                  <div className="w-56">{getFullName(paxItem.paxLastname, paxItem.paxMiddleFirstName)}</div>
                  <div className="w-28">{getPassengerType(paxItem.type)}</div>
                  <div className="w-24">{getPassengerGender(paxItem.paxGender as EPassengerGender)}</div>
                  <div className="w-36">
                    <Tag color={getRoomingColor(paxItem.roomingListType)} bordered={false}>
                      {getRoomingName(paxItem.roomingListType)}
                    </Tag>
                  </div>
                </div>
              ))}
            </div>
          ))
        : null}
    </div>
  );
};
export default RoomingList;
