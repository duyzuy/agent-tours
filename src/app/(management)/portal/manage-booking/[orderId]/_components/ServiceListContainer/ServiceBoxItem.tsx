import React from "react";
import { moneyFormatVND } from "@/utils/helper";
import classNames from "classnames";
import Quantity from "@/components/base/Quantity";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { EditBookingSSRByPassenger } from "../../modules/manageBooking.interface";
import { IProductService } from "@/models/management/booking/service.interface";

export interface ServiceBoxItemProps {
  serviceName?: string;
  consfigItems: IProductService["configs"];
  onChangeQuantity?: (data: {
    action: "minus" | "plus";
    qty: number;
    passenger: IOrderDetail["passengers"][number];
    configItem: IProductService["configs"][number];
  }) => void;
  passenger?: IOrderDetail["passengers"][number];
  selectedItems?: EditBookingSSRByPassenger["ssrList"];
}
const ServiceBoxItem: React.FC<ServiceBoxItemProps> = ({
  serviceName,
  passenger,
  onChangeQuantity,
  consfigItems,
  selectedItems,
}) => {
  const getQuantityValueItem = (record: IProductService["configs"][number]) => {
    const configItem = selectedItems?.find((item) => item.configItem.recId === record.recId);

    return configItem ? configItem.qty : 0;
  };

  return (
    <div className="service__item mb-6 pb-6 border-b">
      <div className="service__item-head flex justify-between mb-3">
        <span className="text-[16px] font-semibold">{serviceName}</span>
      </div>
      <div className="service__item-body">
        {consfigItems.map((configItem, _indexConfig) => (
          <div
            key={configItem.recId}
            className={classNames("pricing-item flex justify-between", {
              "mt-3 border-t border-dashed pt-3": _indexConfig !== 0,
            })}
          >
            <div className="flex items-center gap-x-6">
              <div className="w-28">
                <span className="text-xs text-gray-500 block">Kênh bán</span>
                <span className="block">{configItem.channel}</span>
              </div>
              <div className="w-16">
                <span className="text-xs text-gray-500 block">Hạng</span>
                <span className="block">{configItem.class}</span>
              </div>
              <div className="w-24">
                <span className="text-xs text-gray-500 block">Số lượng còn</span>
                <span className="block text-emerald-600">{configItem.open}</span>
              </div>
              <div className="w-32">
                <span className="text-xs text-gray-500 block">Đơn giá</span>
                <span className="block text-primary-default">
                  {passenger && moneyFormatVND(configItem[passenger.type])}
                </span>
              </div>
            </div>
            <div>
              <span className="text-xs text-gray-500 block"></span>
              <span className="block">
                <Quantity
                  size="sm"
                  value={getQuantityValueItem(configItem)}
                  onChange={(action, qty) => passenger && onChangeQuantity?.({ action, qty, configItem, passenger })}
                />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ServiceBoxItem;
