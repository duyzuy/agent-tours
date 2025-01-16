"use client";
import TableListPage from "@/components/admin/TableListPage";
import { IOperationDeadline } from "@/models/management/core/operationDeadline.interface";
import { useState } from "react";
import { useRouter } from "next/router";
import useOperationDeadline from "../../../modules/useOperationDeadline";
import { columns } from "./columns";
import DrawerOperationDeadline, { DrawerOperationDeadlineProps } from "./DrawerOperationDeadline";
import { useGetOperationDeadlineListQuery } from "@/queries/core/operation";
import { Button, Table, TableProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";

interface DeadlineContainerProps {
  operationId: number;
  isEditAble?: boolean;
}
const DeadlineContainer: React.FC<DeadlineContainerProps> = ({ operationId, isEditAble = true }) => {
  const { data: deadlineData, isLoading: loadingDeadline } = useGetOperationDeadlineListQuery({
    operationId: operationId,
    // enabled: !isLoading && !!data,
  });

  const [action, setAction] = useState<"create" | "edit">();
  const [editRecord, setEditRecord] = useState<IOperationDeadline>();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { onCreate, onUpdate } = useOperationDeadline();

  const setCreate = () => {
    setAction("create");
    setOpenDrawer(true);
  };
  const setEdit = (record: IOperationDeadline) => {
    setAction("edit");
    setOpenDrawer(true);
    setEditRecord(record);
  };
  const closeDrawer = () => {
    setAction(undefined);
    setOpenDrawer(false);
    setEditRecord(undefined);
  };

  const handleSubmit: DrawerOperationDeadlineProps["onSubmit"] = (data, action) => {
    action === "create" &&
      onCreate(data, () => {
        closeDrawer();
      });

    action === "edit" &&
      onUpdate(data, () => {
        closeDrawer();
      });
  };

  const mergedColumns: ColumnsType<IOperationDeadline> = isEditAble
    ? [
        ...columns,
        {
          title: "Hành động",
          width: 200,
          render: (record) => {
            return <Button onClick={() => setEdit(record)}>Sửa</Button>;
          },
        },
      ]
    : [...columns];
  return (
    <>
      <div className="pt-6">
        <div className="mb-6 flex gap-x-4">
          <h3 className="text-lg font-semibold">Danh sách deadline</h3>
          {isEditAble ? (
            <Button onClick={setCreate} type="primary" ghost size="small" icon={<PlusOutlined />}>
              Thêm
            </Button>
          ) : null}
        </div>

        <Table<IOperationDeadline>
          dataSource={deadlineData || []}
          loading={loadingDeadline}
          columns={[...mergedColumns]}
          rowKey={"id"}
        />
      </div>
      <DrawerOperationDeadline
        operationId={operationId}
        open={openDrawer}
        initialValue={editRecord}
        action={action}
        onClose={closeDrawer}
        onSubmit={handleSubmit}
      />
    </>
  );
};
export default DeadlineContainer;
