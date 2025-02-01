import { Badge, Button, Space, Spin, Table, Tag } from "antd";
import { OperationDutyFormQueryParams, TourLeader } from "@/models/management/core/operation/operationDuty.interface";
import useGetOperationDutyList from "@/modules/admin/operation/hooks/useGetOperationDutyList";

export interface OperationDutyListProps {
  onSelect?: (record: TourLeader) => void;
  values?: number[];
}
const OperationDutyList: React.FC<OperationDutyListProps> = ({ onSelect, values }) => {
  const iniQueryParams = new OperationDutyFormQueryParams(undefined, undefined);
  const { data, isLoading } = useGetOperationDutyList({ queryParams: iniQueryParams, enabled: true });

  const isSelected = (recId: number) => {
    return values?.includes(recId);
  };
  return (
    <Table
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
            return (
              <Tag color={isAvailable ? "cyan" : "red"} bordered={false}>
                {isAvailable ? "Khả dụng" : "Không khả dụng"}
              </Tag>
            );
          },
        },
        {
          title: "",
          width: 150,
          render: (value, record, index) => {
            return isSelected(record.supplier.recId) ? (
              <Space className="text-xs">
                <Badge color="green" />
                Đang chọn
              </Space>
            ) : (
              <Button
                size="small"
                type="text"
                onClick={() => onSelect?.(record)}
                className="!bg-emerald-100 !text-emerald-600"
              >
                Chọn
              </Button>
            );
          },
        },
      ]}
      loading={isLoading}
    />
  );
};
export default OperationDutyList;
