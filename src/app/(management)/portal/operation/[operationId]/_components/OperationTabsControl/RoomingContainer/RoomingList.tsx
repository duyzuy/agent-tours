import { RoomingItem, RoomingType } from "@/models/management/booking/rooming.interface";
import { Checkbox, Divider, Tag, TagProps } from "antd";
import { EPassengerGender, EPassengerTitle } from "@/constants/common";
import { getPassengerTitle, getPassengerGender } from "@/constants/common";
import { getRoomingName, ROOM_TYPES } from "@/constants/rooming.constant";
import { getPassengerType } from "@/utils/common";
import React, { useMemo } from "react";
export interface RoomingListProps {
  items: RoomingItem[];
  value?: RoomingItem[];
  onChange?: (item: RoomingItem, items: RoomingItem[]) => void;
  editAble?: boolean;
}
const RoomingList: React.FC<RoomingListProps> = ({ items, value, onChange, editAble }) => {
  type RoomingGroupByPax = { [key: string]: { items: RoomingItem[]; roomType: RoomingType } | undefined };

  const roomGroupByPax = useMemo(() => {
    return items?.reduce<RoomingGroupByPax>((acc, item) => {
      return {
        ...acc,
        [item.roomingListNumber]: {
          roomType: item.roomingListType,
          items: [...(acc[item.roomingListNumber]?.items || []), item],
        },
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

  const getRoomingColor = (type?: RoomingType): TagProps["color"] => {
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
    <div className="rooming-list">
      <div className="flex items-center rounded-md py-2 px-4 font-semibold">
        <div className="w-20">Chọn</div>
        <div className="w-20">Order ID</div>
        <div className="w-56">Họ và tên</div>
        <div className="w-24">Giới tính</div>
        <div className="w-32">Hành khách</div>
        <div className="flex-1">Loại phòng</div>
      </div>
      <Divider style={{ margin: "12px 0" }} />
      <div>
        {roomGroupByPax
          ? Object.entries(roomGroupByPax).map(([key, value], _index) => (
              <React.Fragment key={_index}>
                {_index !== 0 ? <Divider style={{ margin: "12px 0" }} /> : null}
                <div className="room-item flex items-center px-4">
                  <div className="room-item__passengers" key={_index}>
                    {value?.items.map((paxItem) => (
                      <div className="pax-item flex items-center py-2" key={paxItem.bookingPaxId}>
                        <div className="w-20">
                          <Checkbox
                            checked={hasSelectedPaxItem(paxItem)}
                            onChange={() => onChangeRoomingItem(paxItem)}
                            disabled={!editAble}
                          />
                        </div>
                        <div className="w-20">{`#${paxItem.orderId}`}</div>
                        <div className="w-56">{getFullName(paxItem.paxLastname, paxItem.paxMiddleFirstName)}</div>
                        <div className="w-24">{getPassengerGender(paxItem.paxGender as EPassengerGender)}</div>
                        <div className="w-32">{getPassengerType(paxItem.type)}</div>
                      </div>
                    ))}
                  </div>
                  <Tag color={getRoomingColor(value?.roomType)}>{getRoomingName(value?.roomType)}</Tag>
                </div>
              </React.Fragment>
            ))
          : null}
      </div>
    </div>
  );
};
export default RoomingList;
