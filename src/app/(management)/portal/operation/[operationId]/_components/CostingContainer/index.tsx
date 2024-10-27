"use client";
import { Button } from "antd";
import DrawerCosting, { DrawerCostingProps } from "./DrawerCosting";
import { useState } from "react";
import { IOperationCosting } from "@/models/management/core/operationCosting.interface";
import useOperationCosting from "../../../modules/useOperationCosting";
import { useGetOperationCostingListQuery } from "@/queries/core/operation";
import CostingBoxList, { CostingBoxListProps } from "./CostingBoxList";
import DrawerCostingDetail from "./DrawerCostingDetail";
import { OperationCostingParams } from "@/models/management/core/operationCosting.interface";
import { PlusOutlined } from "@ant-design/icons";
import { ISupplier } from "@/models/management/supplier.interface";

interface CostingContainerProps {
  operationId: number;
  totalCosting: number;
  isEditAble?: boolean;
}
const CostingContainer: React.FC<CostingContainerProps> = ({ operationId, totalCosting, isEditAble = true }) => {
  const [action, setAction] = useState<"create" | "edit">();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openCostingDetail, setOpenCostingDetail] = useState(false);
  const [costingItem, setCostingItem] = useState<IOperationCosting>();
  const [supplier, setSupplier] = useState<ISupplier>();

  const { onCreate, onDelete } = useOperationCosting();

  const initQueryParams = new OperationCostingParams(operationId, undefined, undefined);
  const { data: costingList, isLoading } = useGetOperationCostingListQuery({ queryParams: initQueryParams });

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
          {isEditAble && (
            <Button onClick={showCosting} type="primary" ghost size="small" icon={<PlusOutlined />}>
              Thêm
            </Button>
          )}
        </div>
        <CostingBoxList
          items={costingList || []}
          loading={isLoading}
          onView={handleViewCostingDetail}
          onDelete={isEditAble ? handleDeleteCosting : undefined}
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
