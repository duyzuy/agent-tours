import React, { useMemo, useState } from "react";
import { IProductServiceBookingItem, IProductTourBookingItem } from "../../modules/bookingInformation.interface";
import { getPassengerType } from "@/utils/common";
import { moneyFormatVND } from "@/utils/helper";
import { PassengerType } from "@/models/common.interface";
import classNames from "classnames";
import { UserOutlined } from "@ant-design/icons";
import Quantity from "@/components/base/Quantity";

export interface BoxServiceItemByPaxProps {
  serviceName?: string;
  consfigItems: IProductServiceBookingItem["configItem"][];
  onChangeQuantity?: (data: {
    action: "minus" | "plus";
    qty: number;
    bookingIndex: number;
    type: PassengerType;
    configItem: IProductServiceBookingItem["configItem"];
    serviceItem: IProductServiceBookingItem["serviceItem"];
  }) => void;
  bookingItems: IProductTourBookingItem[];
  serviceItem: IProductServiceBookingItem["serviceItem"];
  selectedItems?: IProductServiceBookingItem[];
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
    configItem: IProductServiceBookingItem["configItem"];
  }) => {
    const bookingSSRItem = selectedItems?.find(
      (item) => item.bookingIndex === bookingIndex && item.configItem.recId === configItem.recId,
    );
    return bookingSSRItem?.qty || 0;
  };

  return (
    <div className="service__item bg-white mb-6 rounded-sm drop-shadow-sm">
      <div className="service__item-head px-6 pt-6 flex justify-between">
        <span className="text-[16px] font-semibold">{serviceName}</span>
      </div>
      <div className="service__item-body px-6 pb-6">
        {consfigItems.map((configItem, _indexConfig) => (
          <div
            key={configItem.recId}
            className={classNames("pricing-item", {
              "mt-6": _indexConfig !== 0,
            })}
          >
            <div className="flex items-center gap-x-6 mb-3">
              <div>
                <span className="text-xs text-gray-500 block">Kênh bán</span>
                <span className="block">{configItem.channel}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">Hạng</span>
                <span className="block">{configItem.class}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">Số lượng còn</span>
                <span className="block text-emerald-600">{configItem.open}</span>
              </div>
            </div>
            {bookingItems.map(({ passengerInformation, index: bookingIndex, type }, _index) => (
              <div
                key={bookingIndex + 1}
                className={classNames("flex items-center gap-x-4", {
                  "mt-3 pt-3 border-t border-dashed": _index !== 0,
                })}
              >
                <div className="passenger-name flex-1 flex items-center gap-x-2">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserOutlined />
                  </span>
                  <div>
                    <span className="text-xs text-gray-500 block">{getPassengerType(type)}</span>
                    <span>
                      {passengerInformation.paxLastname && passengerInformation.paxMiddleFirstName
                        ? getPassengerFullname({
                            middleAndFirstName: passengerInformation.paxMiddleFirstName,
                            lastName: passengerInformation.paxLastname,
                          })
                        : `Hành khách ${bookingIndex + 1}`}
                    </span>
                  </div>
                </div>
                <Quantity
                  size="sm"
                  value={getQuantityValueItem({ bookingIndex, configItem })}
                  onChange={(action, qty) =>
                    onChangeQuantity?.({ action, qty, bookingIndex, configItem, serviceItem, type })
                  }
                />
                <div className="w-36 text-right text-primary-default">{moneyFormatVND(configItem[type])}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default BoxServiceItemByPax;

const getPassengerFullname = ({ middleAndFirstName, lastName }: { middleAndFirstName?: string; lastName?: string }) => {
  return `${lastName}, ${middleAndFirstName}`;
};
