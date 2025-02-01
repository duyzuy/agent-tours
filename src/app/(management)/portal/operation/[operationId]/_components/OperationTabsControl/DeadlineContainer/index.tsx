"use client";
import { IOperationDeadline } from "@/models/management/core/operation/operationDeadline.interface";
import { useState } from "react";
import useOperationDeadline from "../../../../modules/useOperationDeadline";
import DrawerOperationDeadline, { DrawerOperationDeadlineProps } from "./DrawerOperationDeadline";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import DeadlineList from "./DeadlineList";

interface DeadlineContainerProps {
  operationId: number;
  editAble?: boolean;
}
const DeadlineContainer: React.FC<DeadlineContainerProps> = ({ operationId, editAble = true }) => {
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

  return (
    <>
      <div className="pt-6">
        <div className="mb-6 flex gap-x-4">
          <h3 className="text-lg font-semibold">Danh sách deadline</h3>
          {editAble ? (
            <Button onClick={setCreate} type="primary" ghost size="small" icon={<PlusOutlined />}>
              Thêm
            </Button>
          ) : null}
        </div>

        <DeadlineList operationId={operationId} onEdit={(record) => setEdit(record)} allowEdit={editAble} />
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
