import { Button, Radio, Space, Table } from "antd";
import { inventoryColumns } from "../../../inventory/columns";
import { useState } from "react";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useGetInventoryListCoreQuery } from "@/queries/core/inventory";
import { IInventory, InventoryQueryParams } from "@/models/management/core/inventory.interface";
import DrawerInventoryForm, { DrawerInventoryFormProps } from "../../../inventory/_components/DrawerInventoryForm";
import useCRUDInventory from "../../../inventory/modules/useCRUDInventory";
import { EProductType } from "@/models/management/core/productType.interface";
import ModalProductTypeSelector from "../../../inventory/_components/ModalProductTypeSelector";

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
  const [showDrawerInventory, setShowDrawerInventory] = useState(false);
  const initQueryParams = new InventoryQueryParams({ supplierId: supplierId, productType: [EProductType.TOUR] }, 1, 10);
  // const [productType, setProductType] = useState<EProductType>();
  const [openModalProductType, setOpenModalProductType] = useState(false);
  const [queryParams, setQueryParams] = useState(initQueryParams);

  const { data, isLoading } = useGetInventoryListCoreQuery({ queryParams: queryParams, enabled: true });

  const { onCreateInventory } = useCRUDInventory();

  // const setCreateInventory = (productType: EProductType) => {
  //   setShowDrawerInventory(true);
  //   setProductType(productType);
  //   setOpenModalProductType(false);
  // };

  // const setCloseModalProductType = () => {
  //   setOpenModalProductType(false);
  // };
  const handleCreateVendor: DrawerInventoryFormProps["onSubmit"] = (action, formdata) => {
    if (action === "CREATE")
      onCreateInventory(formdata, () => {
        setShowDrawerInventory(false);
      });
  };

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
          <Button
            size="small"
            type="primary"
            ghost
            icon={<PlusOutlined />}
            onClick={() => setShowDrawerInventory(true)}
          >
            Thêm dịch vụ
          </Button>
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
      {/* <ModalProductTypeSelector
        open={openModalProductType}
        onSelect={setCreateInventory}
        onClose={setCloseModalProductType}
      /> */}
      <DrawerInventoryForm
        isOpen={showDrawerInventory}
        disableSupplierField={true}
        inventoriesType={inventoriesType}
        supplierId={supplierId}
        // productType={productType}
        onCancel={() => setShowDrawerInventory(false)}
        actionType="CREATE"
        onSubmit={handleCreateVendor}
      />
    </>
  );
};
export default SupplierContainerTab;
