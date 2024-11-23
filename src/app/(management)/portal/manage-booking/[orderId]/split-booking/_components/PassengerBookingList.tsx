import React, { useCallback } from "react";
import { Row, Col, Button } from "antd";

import { getPassengerType } from "@/utils/common";
import { getPassengerTitle } from "@/constants/common";
import classNames from "classnames";
import { TourBookingItemType } from "../modules/splitBooking.interface";
import { ContentDetailList } from "@/components/admin/ContentDetailList";

export interface PassengerBookingListProps {
  items: TourBookingItemType[];
  selectedItems: TourBookingItemType[];
  onSelectItem: (item: TourBookingItemType) => void;
  className?: string;
}
const PassengerBookingList: React.FC<PassengerBookingListProps> = ({
  items,
  selectedItems,
  onSelectItem,
  className = "",
}) => {
  const hasSelectedItem = useCallback(
    (paxItem: TourBookingItemType) => {
      return selectedItems.some((item) => item.recId === paxItem.recId);
    },
    [selectedItems],
  );
  return (
    <div
      className={classNames("box__items", {
        [className]: className,
      })}
    >
      <Row gutter={[16, 16]}>
        {items.map((bookingItem, _index) => (
          <Col span={24} lg={24} xl={12} className="booking__detail__item" key={_index}>
            <div
              className={classNames("p-4 bg-white border rounded-md shadow-sm flex w-full", {
                "border-primary-default": hasSelectedItem(bookingItem),
              })}
            >
              <ContentDetailList.Item label="Hành khách" value={getPassengerType(bookingItem.type)} className="w-24" />
              <ContentDetailList.Item label="Hạng" value={bookingItem.class} className="w-20" />
              <ContentDetailList.Item
                label="Danh xưng"
                value={getPassengerTitle(bookingItem.pax.paxTitle)}
                className="w-24"
              />
              <ContentDetailList.Item label="Họ" value={bookingItem.pax.paxLastname || "--"} className="w-24" />
              <ContentDetailList.Item
                label="Tên đệm và tên"
                value={bookingItem.pax.paxMiddleFirstName || "--"}
                className="flex-1"
              />
              <Button
                type="text"
                onClick={() => onSelectItem(bookingItem)}
                size="small"
                className="!text-blue-600 !bg-blue-100 hover:!bg-blue-200"
              >
                {hasSelectedItem(bookingItem) ? "Huỷ bỏ" : "Chọn"}
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default PassengerBookingList;
