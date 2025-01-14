import classNames from "classnames";
import {
  IProductServiceBookingItemWithoutPax,
  IProductTourBookingItem,
} from "../../../modules/bookingInformation.interface";
import Quantity from "@/components/base/Quantity";
import { moneyFormatVND } from "@/utils/helper";
import { PassengerType } from "@/models/common.interface";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

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

  const columns: ColumnsType<(typeof consfigItems)[number]> = [
    {
      title: "Kênh bán",
      render(value, { channel }, index) {
        return <span className="block">{channel}</span>;
      },
    },
    {
      title: "Hạng",
      render(value, record, index) {
        return <span className="block">{record.class}</span>;
      },
    },
    {
      title: "Giá tiền",
      render(value, { adult }, index) {
        return <span className="text-red-600">{moneyFormatVND(adult)}</span>;
      },
    },
    {
      title: "Số lượng",
      render: (_, record) => (
        <Quantity
          size="sm"
          value={getQuantityValueItem(record)}
          onChange={(action, qty) =>
            onChangeQuantity?.({ action, qty, configItem: record, serviceItem, type: PassengerType.ADULT })
          }
        />
      ),
    },
  ];
  return (
    <div className="service-item bg-white mb-6">
      <div className="service-item__head py-6 flex justify-between">
        <span className="text-[16px] font-semibold">{serviceName}</span>
      </div>
      <Table<(typeof consfigItems)[number]>
        pagination={{
          hideOnSinglePage: true,
          pageSize: 100,
        }}
        dataSource={consfigItems}
        columns={columns}
      />
    </div>
  );
};
export default BoxServiceItemNoPax;
