"use client";
import React, { useMemo, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";

import { RolesPermissionListResponse } from "@/models/management/rolePermission.interface";
import { useGetPermissionsQuery } from "@/queries/role";
import TableListPage from "@/components/admin/TableListPage";
import { columns } from "./columns";
import DrawerPermissions, { DrawerPermissionsProps } from "./_components/DrawerPermissions";
import useCRUDPermission from "./modules/useCRUDPermission";

export type PermissionItemType = RolesPermissionListResponse["result"]["permissionList"][number];
const PermissionPage = () => {
  const { data: rolesPermisions, isLoading } = useGetPermissionsQuery();

  const [actionType, setActionType] = useState<DrawerPermissionsProps["actionType"]>();
  const [isOpenDrawler, setOpenDrawler] = useState(false);
  const { onCreate, onDelete, onUpdate } = useCRUDPermission();
  const [loading, setLoading] = useState(false);
  const [editRecord, setEditRecord] = useState<PermissionItemType>();

  const setCreate = () => {
    setOpenDrawler(true);
    setActionType("CREATE");
  };
  const setEdit = (record: PermissionItemType) => {
    setOpenDrawler(true);
    setActionType("EDIT");
    setEditRecord(record);
  };
  const onCancel = () => {
    setOpenDrawler(false);
    setEditRecord(undefined);
    setActionType(undefined);
  };

  const handleSubmitFormRolePermissions: DrawerPermissionsProps["onSubmit"] = (action, formData) => {
    setLoading(true);
    if (action === "CREATE") {
      onCreate(formData, {
        onSuccess(data, variables, context) {
          setOpenDrawler(() => false);
          setLoading(false);
        },
      });
    }
    if (action === "EDIT") {
      onUpdate(formData, {
        onSuccess(data, variables, context) {
          setOpenDrawler(() => false);
          setLoading(false);
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
        <TableListPage<PermissionItemType>
          scroll={{ x: 1000 }}
          modelName="chức năng"
          showActionsLess={false}
          dataSource={rolesPermisions?.permissionList || []}
          rowKey={"localUser_PermissionKey"}
          columns={columns}
          isLoading={isLoading}
          onEdit={(record) => setEdit(record)}
          onDelete={(record) => onDelete(record.localUser_PermissionKey)}
          pagination={{
            size: "small",
          }}
        />
      </PageContainer>
      <DrawerPermissions
        isOpen={isOpenDrawler}
        onClose={onCancel}
        actionType={actionType}
        initialValues={editRecord}
        onSubmit={handleSubmitFormRolePermissions}
        isLoading={loading}
      />
    </React.Fragment>
  );
};
export default PermissionPage;
