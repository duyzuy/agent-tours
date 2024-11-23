"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import { useGetLocalUserList } from "@/queries/localUser";
import DrawlerUserForm, { DrawlerUserFormProps } from "./components/DrawlerUserForm";
import TableListPage from "@/components/admin/TableListPage";
import { userColumns } from "./userColumns";
import { TDrawlerAction } from "./components/DrawlerUserForm";
import useCRUDLocalUser from "./hooks/useCRUDLocalUser";
import { ILocalUser, LocalUserListResponse } from "@/models/management/localUser.interface";

const UserPage: React.FC = () => {
  const { data: localUsersList, isLoading } = useGetLocalUserList();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [actionType, setActionType] = useState<DrawlerUserFormProps["actionType"]>();
  const [editRecord, setEditRecord] = useState<ILocalUser>();

  const { onUpdate, onCreate, onUpdateStatus } = useCRUDLocalUser();

  const onHandleDrawler = (drawler: TDrawlerAction) => {
    setEditRecord(() => (drawler.type === "EDIT" ? drawler.record : undefined));
    setActionType(drawler.type);
    setOpenDrawer(() => true);
  };
  const onCancel = () => {
    setOpenDrawer(() => false);
    setActionType("CREATE");
    setEditRecord(undefined);
  };
  const onDeleteUser = (recordId: number) => {
    onUpdateStatus({ recordId: recordId, status: "XX" });
  };

  const handleSubmitFormData: DrawlerUserFormProps["onSubmit"] = (action, formData) => {
    if (action === "CREATE") {
      onCreate(formData, {
        onSuccess(data, variables, context) {
          setOpenDrawer(false);
        },
      });
    }

    if (action === "EDIT" && editRecord) {
      onUpdate(
        { ...formData, recId: editRecord.recId },
        {
          onSuccess(data, variables, context) {
            setOpenDrawer(false);
          },
        },
      );
    }
  };

  return (
    <PageContainer name="Danh sách Tài khoản" onClick={() => onHandleDrawler({ type: "CREATE" })} modelName="Tài khoản">
      <TableListPage<LocalUserListResponse["result"][0]>
        scroll={{ x: 1200 }}
        modelName="Tài khoản"
        columns={userColumns}
        rowKey={"recId"}
        dataSource={localUsersList || []}
        isLoading={isLoading}
        onEdit={(record) => onHandleDrawler({ type: "EDIT", record })}
        onDelete={(record) => onDeleteUser(record.recId)}
      />
      <DrawlerUserForm
        isOpen={openDrawer}
        onCancel={onCancel}
        actionType={actionType}
        initialValues={editRecord}
        onSubmit={handleSubmitFormData}
        onUpdateStatus={(recordId, status) => onUpdateStatus({ recordId, status })}
      />
    </PageContainer>
  );
};
export default UserPage;
