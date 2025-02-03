import React, { useMemo, useState } from "react";
// import { IProductServiceBookingItem, IProductTourBookingItem } from "../../../modules/bookingInformation.interface";
import { getPassengerType } from "@/utils/common";
import { moneyFormatVND } from "@/utils/helper";
import { PassengerType } from "@/models/common.interface";
import { UserOutlined } from "@ant-design/icons";
import Quantity from "@/components/base/Quantity";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

import { PortalBookingManagerFormData } from "../../../modules/bookingInformation.interface";
type BookingSSRWithPaxItem = PortalBookingManagerFormData["bookingInfo"]["bookingSsrWithPax"][number];
type BookingItem = PortalBookingManagerFormData["bookingInfo"]["bookingItems"][number];

export interface BoxServiceItemByPaxProps {
  serviceName?: string;
  consfigItems: BookingSSRWithPaxItem["configItem"][];
  onChangeQuantity?: (data: {
    action: "minus" | "plus";
    qty: number;
    bookingIndex: number;
    type: PassengerType;
    configItem: BookingSSRWithPaxItem["configItem"];
    serviceItem: BookingSSRWithPaxItem["serviceItem"];
  }) => void;
  bookingItems: BookingItem[];
  serviceItem: BookingSSRWithPaxItem["serviceItem"];
  selectedItems?: BookingSSRWithPaxItem[];
}
const BoxServiceItemByPax: React.FC<BoxServiceItemByPaxProps> = ({
  serviceName,
  bookingItems = [],
  onChangeQuantity,
  consfigItems,
  serviceItem,
  selectedItems,
}) => {
  const getQuantityValueItem = ({
    bookingIndex,
    configItem,
  }: {
    bookingIndex: number;
    configItem: BookingSSRWithPaxItem["configItem"];
  }) => {
    const bookingSSRItem = selectedItems?.find(
      (item) => item.bookingIndex === bookingIndex && item.configItem.recId === configItem.recId,
    );
    return bookingSSRItem?.qty || 0;
  };

  const getColumns = (configItem: (typeof consfigItems)[number]): ColumnsType<BookingItem> => {
    return [
      {
        title: "Hành khách",
        render: (value, { passengerInformation, index, type }) => (
          <div className="passenger-name flex-1 flex items-center gap-x-2">
            <span className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center">
              <UserOutlined />
            </span>
            <div>
              <span className="text-xs text-gray-500 block">{getPassengerType(type)}</span>
              <span>
                {passengerInformation?.paxLastname && passengerInformation?.paxMiddleFirstName
                  ? getPassengerFullname({
                      middleAndFirstName: passengerInformation.paxMiddleFirstName,
                      lastName: passengerInformation.paxLastname,
                    })
                  : `Hành khách ${index + 1}`}
              </span>
            </div>
          </div>
        ),
      },
      {
        title: "Kênh bán",
        render: () => (
          <>
            <div>{configItem.channel}</div>
            <div className="text-xs">{configItem.class}</div>
          </>
        ),
      },
      {
        title: "Giá tiền",
        render: (_, { type }) => <span className="text-red-600">{moneyFormatVND(configItem[type])}</span>,
      },
      {
        title: "Số lượng",
        render: (_, record) => (
          <Quantity
            size="sm"
            value={getQuantityValueItem({ bookingIndex: record.index, configItem })}
            onChange={(action, qty) =>
              onChangeQuantity?.({
                action,
                qty,
                bookingIndex: record.index,
                configItem,
                serviceItem,
                type: record.type,
              })
            }
          />
        ),
      },
    ];
  };
  return (
    <div className="service__item bg-white mb-6 rounded-sm">
      <div className="service__item-head pt-6 flex justify-between mb-3">
        <span className="text-[16px] font-semibold">{serviceName}</span>
      </div>
      {consfigItems.map((configItem, _indexConfig) => (
        <Table<BookingItem>
          key={configItem.recId}
          rowKey={"index"}
          pagination={{
            hideOnSinglePage: true,
            pageSize: 100,
          }}
          dataSource={bookingItems}
          columns={getColumns(configItem)}
        />
      ))}
    </div>
  );
};
export default BoxServiceItemByPax;

const getPassengerFullname = ({ middleAndFirstName, lastName }: { middleAndFirstName?: string; lastName?: string }) => {
  return `${lastName}, ${middleAndFirstName}`;
};
