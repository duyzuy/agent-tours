import { ISupplier, SupplierQueryParams } from "@/models/management/supplier.interface";
import { useGetSupplierListCoreQuery } from "@/queries/core/supplier";
import { Button, Table } from "antd";
import { supplierColumn } from "../../../manage-supplier/columns";
import { useState } from "react";
import { EyeOutlined, PlusOutlined, RightCircleOutlined, RightOutlined } from "@ant-design/icons";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import DrawerSupplierForm, { DrawerSupplierFormProps } from "../../../manage-supplier/_components/DrawerSupplierForm";
import useManageSupplier from "../../../manage-supplier/modules/useManageSupplier";
export interface VendorContainerTabProps {
  vendorId: number;
  inventoriesType: EInventoryType[];
  canCreateSupplier?: boolean;
}
const VendorContainerTab: React.FC<VendorContainerTabProps> = ({
  vendorId,
  inventoriesType,
  canCreateSupplier = true,
}) => {
  const [showDrawerSupplier, setShowDrawer] = useState(false);
  const initQueryParams = new SupplierQueryParams({ vendorId: vendorId }, 1, 10);

  const { data, isLoading } = useGetSupplierListCoreQuery({ queryParams: initQueryParams, enabled: true });
  const { onCreate } = useManageSupplier();

  const setCreateSupplier = () => {
    setShowDrawer(true);
  };

  const handleCreateVendor: DrawerSupplierFormProps["onSubmit"] = (action, formdata) => {
    if (action === "CREATE")
      onCreate(formdata, () => {
        setShowDrawer(false);
      });
  };
  return (
    <>
      <div className="flex gap-x-2 mb-3">
        <h3 className="font-semibold text-lg mb-3">Danh sách supplier</h3>
        {canCreateSupplier ? (
          <Button size="small" type="primary" ghost icon={<PlusOutlined />} onClick={setCreateSupplier}>
            Thêm
          </Button>
        ) : null}
      </div>
      <Table
        columns={supplierColumn}
        rowKey={"recId"}
        dataSource={data?.list || []}
        loading={isLoading}
        pagination={{ hideOnSinglePage: true, size: "small", total: data?.totalItems }}
      />
      <DrawerSupplierForm
        isOpen={showDrawerSupplier}
        disabledVendorField={true}
        onCancel={() => setShowDrawer(false)}
        actionType="CREATE"
        vendorInventoriesType={inventoriesType}
        vendorId={vendorId}
        onSubmit={handleCreateVendor}
      />
    </>
  );
};
export default VendorContainerTab;
