"use client";
import React, { useState } from "react";
import {
  useCreatePermission,
  useUpdatePermission,
  useDeletePermission,
  useGetPermissions,
} from "@/modules/admin/permission/hooks";
import { PermissionPayload } from "@/models/management/permission.interface";
import PermissionFormDrawer, {
  PermissionFormDrawerProps,
} from "@/modules/admin/permission/components/PermissionFormDrawer";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { columns } from "./columns";

const PermissionPage = () => {
  const [formAction, setFormAction] = useState<PermissionFormDrawerProps["action"]>();
  const [isOpenDrawler, setOpenDrawler] = useState(false);

  const { data: rolesPermisions, isLoading } = useGetPermissions();
  const { mutate: createPer, isPending: isLoadingCreate } = useCreatePermission();
  const { mutate: updatePer, isPending: isLoadingUpdate } = useUpdatePermission();
  const { mutate: deletePer } = useDeletePermission();

  type PermissionRecord = Exclude<typeof rolesPermisions, undefined>["permissionList"][number];

  const [editRecord, setEditRecord] = useState<PermissionRecord>();

  const setCreate = () => {
    setOpenDrawler(true);
    setFormAction("CREATE");
  };
  const setEdit = (record: PermissionRecord) => {
    setOpenDrawler(true);
    setFormAction("EDIT");
    setEditRecord(record);
  };
  const onCancel = () => {
    setOpenDrawler(false);
    setEditRecord(undefined);
    setFormAction(undefined);
  };

  const handleSubmitFormRolePermissions: PermissionFormDrawerProps["onSubmit"] = (action, formData) => {
    if (action === "CREATE") {
      const payload: PermissionPayload = {
        cat: formData.cat,
        status: formData.status,
        permissionList: [
          {
            groupKey: formData.groupKey,
            groupName: formData.groupName,
            localUser_PermissionKey: formData.localUser_PermissionKey,
            localUser_PermissionValue: formData.localUser_PermissionValue,
            status: formData.status,
          },
        ],
      };
      createPer(payload, {
        onSuccess(data, variables, context) {
          setOpenDrawler(() => false);
        },
      });
    }
    if (action === "EDIT") {
      updatePer(formData, {
        onSuccess(data, variables, context) {
          setOpenDrawler(() => false);
        },
      });
    }
  };

  return (
    <React.Fragment>
      <PageContainer
        name="Chức năng"
        modelName="chức năng"
        onClick={setCreate}
        breadCrumItems={[{ title: "chức năng" }]}
      >
        <TableListPage<PermissionRecord>
          scroll={{ x: 1000 }}
          modelName="chức năng"
          showActionsLess={false}
          dataSource={rolesPermisions?.permissionList || []}
          rowKey={"localUser_PermissionKey"}
          columns={columns}
          isLoading={isLoading}
          onEdit={(record) => setEdit(record)}
          onDelete={(record) => deletePer(record.localUser_PermissionKey)}
          pagination={{
            size: "small",
            hideOnSinglePage: true,
            pageSize: 20,
          }}
        />
      </PageContainer>
      <PermissionFormDrawer
        isOpen={isOpenDrawler}
        onClose={onCancel}
        action={formAction}
        initialValues={editRecord}
        onSubmit={handleSubmitFormRolePermissions}
        loading={isLoadingCreate || isLoadingUpdate}
      />
    </React.Fragment>
  );
};
export default PermissionPage;
