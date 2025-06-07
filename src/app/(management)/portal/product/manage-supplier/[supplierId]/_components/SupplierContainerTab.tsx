import { Button, Radio, Space, Table } from "antd";
import { inventoryColumns } from "../../../inventory/columns";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";

import { useGetInventoryListCoreQuery } from "@/queries/core/inventory";
import { InventoryQueryParams } from "@/models/management/core/inventory.interface";
import DrawerInventoryForm, { DrawerInventoryFormProps } from "../../../inventory/_components/DrawerInventoryForm";
import useCRUDInventory from "../../../inventory/modules/useCRUDInventory";
import { EProductType } from "@/models/management/core/productType.interface";
import CreateInventoryButton from "./CreateInventoryButton";

export interface SupplierContainerTabProps {
  supplierId: number;
  inventoriesType: EInventoryType[];
  canCreateInventory?: boolean;
}
const SupplierContainerTab: React.FC<SupplierContainerTabProps> = ({
  supplierId,
  inventoriesType,
  canCreateInventory = true,
}) => {
  const initQueryParams = new InventoryQueryParams({ supplierId: supplierId, productType: [EProductType.TOUR] }, 1, 10);
  const [queryParams, setQueryParams] = useState(initQueryParams);

  const { data, isLoading } = useGetInventoryListCoreQuery({ queryParams: queryParams, enabled: true });

  const onFilterProductType = (productType: EProductType) => {
    setQueryParams((prev) => ({
      ...prev,
      requestObject: {
        ...prev.requestObject,
        productType: [productType],
      },
    }));
  };
  return (
    <>
      <div className="flex gap-x-2 mb-3">
        <h3 className="font-semibold text-lg mb-3">Danh sách dịch vụ</h3>
        {canCreateInventory ? (
          <CreateInventoryButton inventoriesType={inventoriesType} supplierId={supplierId} />
        ) : null}
      </div>
      <div className="mb-6">
        <Space>
          <Radio
            value={EProductType.TOUR}
            checked={queryParams.requestObject?.productType?.includes(EProductType.TOUR)}
            onChange={() => onFilterProductType(EProductType.TOUR)}
          >
            Dịch vụ trong tour
          </Radio>
          <Radio
            value={EProductType.EXTRA}
            checked={queryParams.requestObject?.productType?.includes(EProductType.EXTRA)}
            onChange={() => onFilterProductType(EProductType.EXTRA)}
          >
            Dịch vụ trong và ngoài tour
          </Radio>
        </Space>
      </div>
      <Table
        columns={inventoryColumns}
        rowKey={"recId"}
        dataSource={data?.list || []}
        loading={isLoading}
        pagination={{ hideOnSinglePage: true, size: "small", total: data?.totalItems }}
      />
    </>
  );
};
export default SupplierContainerTab;
