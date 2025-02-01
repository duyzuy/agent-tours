import {
  IOperationDeadline,
  OperationDeadlineQueryParams,
} from "@/models/management/core/operation/operationDeadline.interface";
import { useGetOperationDeadlineListQuery } from "@/queries/core/operation";
import { Table, Button, Space, Checkbox } from "antd";
import { ColumnsType } from "antd/es/table";
import { columns } from "./columns";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import FormItem from "@/components/base/FormItem";

interface DeadlineListProps {
  operationId: number;
  allowEdit?: boolean;
  onEdit?: (record: IOperationDeadline) => void;
}
const DeadlineList: React.FC<DeadlineListProps> = ({ operationId, allowEdit, onEdit }) => {
  const [queryparams, setQueryParmams] = useState<OperationDeadlineQueryParams>(
    () =>
      new OperationDeadlineQueryParams({ operationId: operationId, status: undefined }, 1, 10, {
        sortColumn: "id",
        direction: "desc",
      }),
  );

  const { data: deadlineData, isLoading: loadingDeadline } = useGetOperationDeadlineListQuery({
    queryParams: queryparams,
    enabled: true,
  });

  const handleChangeStatus = (status: Exclude<OperationDeadlineQueryParams["requestObject"], undefined>["status"]) => {
    setQueryParmams((prev) => ({ ...prev, requestObject: { ...prev.requestObject, status: status } }));
  };
  const handleCheckAll = () => {
    setQueryParmams((prev) => ({ ...prev, requestObject: { ...prev.requestObject, status: undefined } }));
  };
  const mergedColumns: ColumnsType<IOperationDeadline> = allowEdit
    ? [
        ...columns,
        {
          title: "",
          width: 120,
          render: (record) => {
            return (
              <Button icon={<EditOutlined />} onClick={() => onEdit?.(record)} type="text" size="small">
                Sửa
              </Button>
            );
          },
        },
      ]
    : [...columns];

  return (
    <>
      <FormItem label="Trạng thái">
        <Space>
          <Checkbox checked={!queryparams.requestObject?.status} onChange={handleCheckAll}>
            Tất cả
          </Checkbox>
          {["NEW", "PRE_DEADLINE", "EXPIRED", "DONE"].map((item) => (
            <Checkbox
              key={item}
              checked={item === queryparams.requestObject?.status}
              onChange={() =>
                handleChangeStatus(item as Exclude<OperationDeadlineQueryParams["requestObject"], undefined>["status"])
              }
            >
              {item}
            </Checkbox>
          ))}
        </Space>
      </FormItem>
      <Table<IOperationDeadline>
        rowKey={"id"}
        dataSource={deadlineData?.list || []}
        loading={loadingDeadline}
        columns={[...mergedColumns]}
        pagination={{
          pageSize: deadlineData?.pageSize,
          current: deadlineData?.pageCurrent,
          total: deadlineData?.totalItems,
          size: "small",
          hideOnSinglePage: true,
          onChange(page, pageSize) {
            setQueryParmams((prev) => ({ ...prev, pageSize: pageSize, pageCurrent: page }));
          },
        }}
      />
    </>
  );
};
export default DeadlineList;
