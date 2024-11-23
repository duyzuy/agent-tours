import classNames from "classnames";
import { IProductServiceBookingItemWithoutPax } from "../../modules/bookingInformation.interface";
import Quantity from "@/components/base/Quantity";
import { moneyFormatVND } from "@/utils/helper";
import { PassengerType } from "@/models/common.interface";

export interface BoxServiceItemNoPaxProps {
  serviceName: string;
  consfigItems: IProductServiceBookingItemWithoutPax["configItem"][];
  serviceItem: IProductServiceBookingItemWithoutPax["serviceItem"];
  onChangeQuantity?: (data: {
    action: "minus" | "plus";
    qty: number;
    type: PassengerType.ADULT;
    configItem: IProductServiceBookingItemWithoutPax["configItem"];
    serviceItem: IProductServiceBookingItemWithoutPax["serviceItem"];
  }) => void;
  selectedItems?: IProductServiceBookingItemWithoutPax[];
}
const BoxServiceItemNoPax: React.FC<BoxServiceItemNoPaxProps> = ({
  serviceName,
  consfigItems,
  serviceItem,
  selectedItems,
  onChangeQuantity,
}) => {
  const getQuantityValueItem = (configItem: IProductServiceBookingItemWithoutPax["configItem"]) => {
    const item = selectedItems?.find((item) => item.configItem.recId === configItem.recId);
    return item?.qty || 0;
  };

  return (
    <div className="service__item bg-white mb-6 rounded-sm drop-shadow-sm">
      <div className="service__item-head px-6 py-6 flex justify-between">
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
            <div className={classNames("flex items-center gap-x-4")}>
              <Quantity
                size="sm"
                value={getQuantityValueItem(configItem)}
                onChange={(action, qty) =>
                  onChangeQuantity?.({ action, qty, configItem, serviceItem, type: PassengerType.ADULT })
                }
              />
              <div className="w-36 text-right text-primary-default">
                {moneyFormatVND(configItem[PassengerType.ADULT])}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BoxServiceItemNoPax;
