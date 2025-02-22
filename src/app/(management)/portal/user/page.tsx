"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import { useGetLocalUserList } from "@/queries/localUser";
import DrawlerUserForm, { DrawlerUserFormProps, TDrawlerAction } from "./_components/DrawlerUserForm";
import TableListPage from "@/components/admin/TableListPage";
import { userColumns } from "./userColumns";
import { ILocalUser, LocalUserListResponse } from "@/models/management/localUser.interface";
import useCreateUser from "@/modules/admin/user/hooks/useCreatUser";
import useUpdateUserStatus from "@/modules/admin/user/hooks/useUpdateUserStatus";
import useUpdateUser from "@/modules/admin/user/hooks/useUpdateUser";

const UserPage: React.FC = () => {
  const { data: localUsersList, isLoading } = useGetLocalUserList();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [actionType, setActionType] = useState<DrawlerUserFormProps["actionType"]>();
  const [editRecord, setEditRecord] = useState<ILocalUser>();

  const { mutate: updateUser, isPending: isLoadingUpdate } = useUpdateUser();
  const { mutate: createUser, isPending: isLoadingCreate } = useCreateUser();
  const { mutate: updateStatus, isPending: isLoadingUpdateStatus } = useUpdateUserStatus();

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
  const handleDeleteUser = (recId: number) => {
    updateStatus({ recId, status: "XX" });
  };

  const handleSubmitFormData: DrawlerUserFormProps["onSubmit"] = (action, formData) => {
    if (action === "CREATE") {
      createUser(formData, {
        onSuccess(data, variables, context) {
          setOpenDrawer(false);
        },
      });
    }

    if (action === "EDIT" && editRecord) {
      updateUser(
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
        onDelete={(record) => handleDeleteUser(record.recId)}
      />
      <DrawlerUserForm
        isOpen={openDrawer}
        onCancel={onCancel}
        actionType={actionType}
        initialValues={editRecord}
        isLoading={isLoadingCreate || isLoadingUpdate}
        onSubmit={handleSubmitFormData}
      />
    </PageContainer>
  );
};
export default UserPage;
