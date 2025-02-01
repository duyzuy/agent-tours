"use client";
import { Button } from "antd";
import DrawerCosting, { DrawerCostingProps } from "./DrawerCosting";
import { useState } from "react";
import { IOperationCosting } from "@/models/management/core/operation/operationCosting.interface";
import useOperationCosting from "../../../../modules/useOperationCosting";

import CostingBoxList, { CostingBoxListProps } from "./CostingBoxList";
import DrawerCostingDetail from "./DrawerCostingDetail";

import { PlusOutlined } from "@ant-design/icons";
import { ISupplier } from "@/models/management/supplier.interface";

interface CostingContainerProps {
  operationId: number;
  totalCosting: number;
  editAble?: boolean;
}
const CostingContainer: React.FC<CostingContainerProps> = ({ operationId, totalCosting, editAble = true }) => {
  const [action, setAction] = useState<"create" | "edit">();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openCostingDetail, setOpenCostingDetail] = useState(false);
  const [costingItem, setCostingItem] = useState<IOperationCosting>();
  const [supplier, setSupplier] = useState<ISupplier>();

  const { onCreate, onDelete } = useOperationCosting();

  const showCosting = () => {
    setOpenDrawer(true);
  };
  const cancelCosting = () => {
    setOpenDrawer(false);
  };
  const showCostingDetail = () => {
    setOpenCostingDetail(true);
  };
  const cancelCostingDetail = () => {
    setOpenCostingDetail(false);
  };

  const handleSubmit: DrawerCostingProps["onSubmit"] = (data) => {
    onCreate(data, () => {
      setOpenDrawer(false);
    });
  };
  const handleViewCostingDetail: CostingBoxListProps["onView"] = (supplier, data) => {
    setCostingItem(data);
    setSupplier(supplier);
    showCostingDetail();
  };

  const handleDeleteCosting: CostingBoxListProps["onDelete"] = (record) => {
    onDelete(record.id);
  };
  return (
    <>
      <div className="pt-6">
        <div className="mb-6 flex gap-x-4">
          <h3 className="text-lg font-semibold">Danh sách phí và dịch vụ</h3>
          {editAble && (
            <Button onClick={showCosting} type="primary" ghost size="small" icon={<PlusOutlined />}>
              Thêm
            </Button>
          )}
        </div>
        <CostingBoxList
          operationId={operationId}
          onView={handleViewCostingDetail}
          onDelete={editAble ? handleDeleteCosting : undefined}
        />
      </div>
      <DrawerCosting operationId={operationId} open={openDrawer} onClose={cancelCosting} onSubmit={handleSubmit} />
      <DrawerCostingDetail
        name={`${supplier?.fullName} - ${costingItem?.type}`}
        open={openCostingDetail}
        onClose={cancelCostingDetail}
        costingId={costingItem?.id}
        type={costingItem?.type}
      />
    </>
  );
};
export default CostingContainer;
