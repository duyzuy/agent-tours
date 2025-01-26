import { IOperationCosting } from "@/models/management/core/operation/operationCosting.interface";
import { ISupplier } from "@/models/management/supplier.interface";
import { moneyFormatVND } from "@/utils/helper";
import { DeleteOutlined, EyeOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Spin, Table, Tag } from "antd";
import { useGetOperationCostingListQuery } from "@/queries/core/operation";
import { OperationCostingParams } from "@/models/management/core/operation/operationCosting.interface";

export interface CostingBoxListProps {
  onView?: (supplier: ISupplier, data: IOperationCosting) => void;
  onAdd?: (data: IOperationCosting) => void;
  onDelete?: (data: IOperationCosting) => void;
  operationId: number;
}

const CostingBoxList: React.FC<CostingBoxListProps> = ({ operationId, onView, onDelete }) => {
  const initQueryParams = new OperationCostingParams(operationId, undefined, undefined);

  const { data: costingList, isLoading } = useGetOperationCostingListQuery({ queryParams: initQueryParams });

  type DataType = Exclude<typeof costingList, undefined>[number];

  return (
    <>
      <Table<DataType>
        dataSource={costingList}
        rowKey={"id"}
        loading={isLoading}
        pagination={{ size: "small", hideOnSinglePage: true }}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
          },
          {
            title: "Nhà cung cấp",
            dataIndex: "supplierId",
            render: (value, { supplier }, index) => {
              return (
                <>
                  <div>{supplier.fullName}</div>
                  <div className="text-xs opacity-60">{supplier.shortName}</div>
                </>
              );
            },
          },
          {
            title: "Dịch vụ",
            dataIndex: "type",
          },
          {
            title: "Tổng tiền",
            dataIndex: "type",
            render: (value, { totalCost }, index) => {
              return <div className="text-red-600">{moneyFormatVND(totalCost)}</div>;
            },
          },
          {
            title: "Trạng thái",
            dataIndex: "status",
            render: (value, { status }, index) => {
              return (
                <Tag bordered={false} color="blue">
                  {status}
                </Tag>
              );
            },
          },
          {
            title: "",
            render(value, record, index) {
              return (
                <Space>
                  <Button
                    type="text"
                    size="small"
                    onClick={() => onView?.(record.supplier, record)}
                    icon={<EyeOutlined />}
                    className="!text-primary-default"
                  >
                    Xem
                  </Button>
                  <Popconfirm
                    title="Xoá"
                    description="Bạn muốn xoá loại dịch vụ này?"
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                    onConfirm={() => onDelete?.(record)}
                  >
                    <Button type="text" danger size="small" icon={<DeleteOutlined />}>
                      Xoá
                    </Button>
                  </Popconfirm>
                </Space>
              );
            },
          },
        ]}
      />
    </>
  );
};
export default CostingBoxList;
