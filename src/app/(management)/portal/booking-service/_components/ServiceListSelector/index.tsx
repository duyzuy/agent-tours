import { IProductService } from "@/models/management/booking/product.interface";
import { Button, Table } from "antd";
import React, { memo, useMemo } from "react";
import { columns } from "./columns";
import { usePortalBookingServiceManager } from "../../modules/store/context";

export interface ServiceListSelectorProps {
  onSelect?: (data: IProductService) => void;
  loading?: boolean;
}
const ServiceListSelector: React.FC<ServiceListSelectorProps> = ({ onSelect, loading }) => {
  const [bookingInfo, _] = usePortalBookingServiceManager();
  const productList = useMemo(() => bookingInfo?.productList, [bookingInfo.productList]);

  const isValidPriceConfig = (priceConfigs: IProductService["configs"]) => {
    let isValid = true;

    if (priceConfigs.length === 0) {
      isValid = false;
    }
    if (priceConfigs.every((item) => item.open === 0)) {
      isValid = false;
    }

    return isValid;
  };
  return (
    <Table
      size="large"
      dataSource={productList}
      rowKey={"sellableId"}
      loading={loading}
      pagination={{
        hideOnSinglePage: true,
      }}
      columns={[
        ...columns,
        {
          title: "Tác vụ",
          width: 200,
          render(value, record, index) {
            return isValidPriceConfig(record.configs) ? (
              <Button type="text" className="w-20 !bg-cyan-100 !text-cyan-600" onClick={() => onSelect?.(record)}>
                Chọn
              </Button>
            ) : (
              <Button
                type="text"
                className="w-20 !bg-gray-200 !text-gray-600 opacity-60"
                disabled
                onClick={() => onSelect?.(record)}
              >
                Chọn
              </Button>
            );
          },
        },
      ]}
    />
  );
};
export default memo(ServiceListSelector);
