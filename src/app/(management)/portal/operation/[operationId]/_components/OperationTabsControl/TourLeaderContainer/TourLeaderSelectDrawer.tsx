import React from "react";
import { Drawer, Button, Badge, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UpdateOperationDutyPayload } from "@/models/management/core/operation/operationDuty.interface";
import { OperationDutyFormQueryParams } from "@/models/management/core/operation/operationDuty.interface";
import useGetOperationDutyList from "@/modules/admin/operation/hooks/useGetOperationDutyList";
import useMessage from "@/hooks/useMessage";
export interface TourLeaderSelectDrawerProps {
  sellableId: number;
  maximumDutyAmount: number;
  onSubmit?: (formData: UpdateOperationDutyPayload) => void;
  open?: boolean;
  onCancel?: () => void;
  supplierIds?: number[];
}
const TourLeaderSelectDrawer: React.FC<TourLeaderSelectDrawerProps> = ({
  open,
  onCancel,
  sellableId,
  maximumDutyAmount,
  onSubmit,
  supplierIds,
}) => {
  const iniQueryParams = new OperationDutyFormQueryParams(undefined, undefined);
  const { data, isLoading } = useGetOperationDutyList({ queryParams: iniQueryParams, enabled: true });

  type DataTypeItem = Exclude<typeof data, undefined>[number];
  const isSelected = (recId: number) => {
    return supplierIds?.includes(recId);
  };

  const message = useMessage();

  const addTourLeader = (record: DataTypeItem) => {
    if (supplierIds && supplierIds.length >= maximumDutyAmount) {
      message.info(`Hiện tại chỉ cho tối đa ${maximumDutyAmount} tour leader.`);
      return;
    }
    const dutyItem: UpdateOperationDutyPayload = {
      sellableId: sellableId,
      suppliers: [{ supplierId: record.supplier.recId, remark: "" }],
    };
    onSubmit?.(dutyItem);
  };

  return (
    <Drawer open={open} width={550} destroyOnClose={true} onClose={onCancel} title="Thêm tour leader">
      <Table<DataTypeItem>
        dataSource={data}
        rowKey={(record) => record.supplier.recId}
        pagination={{
          size: "small",
          hideOnSinglePage: true,
        }}
        columns={[
          {
            title: "#ID",
            dataIndex: "recId",
            render: (value, record, index) => {
              return record.supplier.recId;
            },
          },
          {
            title: "Họ và tên",
            dataIndex: "fullname",
            render: (value, { supplier }, index) => {
              return (
                <div>
                  <div>{supplier.fullname}</div>
                  <div className="text-xs text-gray-600">{supplier.shortname}</div>
                </div>
              );
            },
          },
          {
            title: "Trạng thái",
            render: (value, { isAvailable }, index) => {
              return <Badge color={isAvailable ? "green" : "red"} text={isAvailable ? "Khả dụng" : "Không khả dụng"} />;
            },
          },
          {
            title: "",
            width: 150,
            render: (value, record, index) => {
              return isSelected(record.supplier.recId) ? (
                <Button size="small" type="text" disabled>
                  Đang chọn
                </Button>
              ) : (
                <Button
                  size="small"
                  type="primary"
                  ghost
                  icon={<PlusOutlined />}
                  onClick={() => addTourLeader?.(record)}
                >
                  Thêm
                </Button>
              );
            },
          },
        ]}
        loading={isLoading}
      />
    </Drawer>
  );
};
export default TourLeaderSelectDrawer;
