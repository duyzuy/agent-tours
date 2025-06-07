import { IProductService } from "@/models/management/booking/product.interface";
import { Button, Table } from "antd";
import React, { memo, useMemo } from "react";
import { columns } from "./columns";
import { usePortalBookingServiceManager } from "../../store/bookingServiceContext";

export interface ServiceListSelectorProps {
  onSelect?: (data: IProductService) => void;
  loading?: boolean;
}
const ServiceListSelector: React.FC<ServiceListSelectorProps> = ({ onSelect, loading }) => {
  const [bookingInfo, _] = usePortalBookingServiceManager();
  const productList = useMemo(() => bookingInfo?.serviceList, [bookingInfo.serviceList]);

  const hasPriceConfigAvailable = (priceConfigs: IProductService["configs"]) => {
    if (!priceConfigs.length || priceConfigs.every((item) => !item.open)) {
      return false;
    }
    return true;
  };
  const handleSelect = (record: IProductService) => () => onSelect?.(record);

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
            return hasPriceConfigAvailable(record.configs) ? (
              <Button type="text" className="w-20 !bg-cyan-100 !text-cyan-600" onClick={handleSelect(record)}>
                Chọn
              </Button>
            ) : (
              <Button type="text" className="w-20 !bg-gray-200 !text-gray-600 opacity-60" disabled>
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
