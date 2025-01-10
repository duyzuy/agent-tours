import { IProductTour } from "@/models/management/booking/product.interface";
import { formatDate } from "@/utils/date";
import { moneyFormatVND } from "@/utils/helper";
import { Button, Table } from "antd";
import React from "react";
import { columns } from "./columns";

interface ProductListProps {
  items: IProductTour[];
  onSelect?: (data: IProductTour) => void;
  loading?: boolean;
}
const ProductList: React.FC<ProductListProps> = ({ items, onSelect, loading }) => {
  const isValidPriceConfig = (priceConfigs: IProductTour["configs"]) => {
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
      dataSource={items}
      rowKey={"sellableId"}
      loading={loading}
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
export default ProductList;
