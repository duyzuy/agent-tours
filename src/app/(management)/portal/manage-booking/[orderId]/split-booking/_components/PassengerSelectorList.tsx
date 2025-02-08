import React, { useCallback, useMemo } from "react";
import { Row, Col, Button } from "antd";

import { getPassengerType } from "@/utils/common";
import { getPassengerTitle } from "@/constants/common";
import classNames from "classnames";
import { TourBookingDetailItem } from "../modules/splitBooking.interface";
import { ContentDetailList } from "@/components/admin/ContentDetailList";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import useSelectPassenger from "../modules/useSelectPassenger";

export interface PassengerSelectorListProps {
  passengers: IOrderDetail["passengers"];
  tourBookings: IOrderDetail["tourBookings"];
  className?: string;
}

const PassengerSelectorList: React.FC<PassengerSelectorListProps> = ({ passengers, tourBookings, className = "" }) => {
  const { passengers: currentpaxList, addOrRemovePassenger } = useSelectPassenger();
  const bookingPassengerList = useMemo(() => {
    return tourBookings.reduce<TourBookingDetailItem[]>((acc, item) => {
      const passenger = passengers.find((paxItem) => paxItem.recId === item.paxId);
      if (passenger) {
        acc = [...acc, { ...item, pax: passenger }];
      }
      return acc;
    }, []);
  }, [passengers, tourBookings]);

  const hasSelected = useCallback(
    (paxItem: TourBookingDetailItem) => {
      return currentpaxList.some((item) => item.recId === paxItem.recId);
    },
    [currentpaxList],
  );

  const onSelectItem = (item: TourBookingDetailItem) => {
    addOrRemovePassenger(item);
  };

  return (
    <div
      className={classNames("passengers max-w-6xl", {
        [className]: className,
      })}
    >
      <Row gutter={[16, 16]}>
        {bookingPassengerList.map((bookingItem, _index) => (
          <Col span={24} lg={12} xl={12} className="booking__detail__item" key={_index}>
            <div
              className={classNames("p-4 bg-white border rounded-md shadow-sm flex w-full", {
                "border-primary-default": hasSelected(bookingItem),
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
                {hasSelected(bookingItem) ? "Huỷ bỏ" : "Chọn"}
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default PassengerSelectorList;
