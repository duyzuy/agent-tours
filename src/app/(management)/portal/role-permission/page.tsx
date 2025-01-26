"use client";
import React, { useMemo, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import { RolesPermissionListResponse } from "@/models/management/rolePermission.interface";

import TableListPage from "@/components/admin/TableListPage";
import { columnRoleGroups } from "./columns";
import RolePermissionFormDrawer, {
  RolePermissionFormDrawerProps,
} from "@/modules/admin/rolePers/components/RolePermissionFormDrawer";

import { useCreateRolePermissions, useUpdateRolePermissions, useDeleteRolePermissions } from "@/modules/admin/rolePers";
import { useGetRolePermission } from "@/modules/admin/rolePers";
import { getPermissionList } from "@/modules/admin/rolePers/utils";

const RolePermissionPage = () => {
  const { data: rolesPermisions, isLoading } = useGetRolePermission();

  const [actionType, setActionType] = useState<RolePermissionFormDrawerProps["actionType"]>();
  const [isOpenDrawler, setOpenDrawler] = useState(false);
  // const { onCreate, onDelete, onUpdate } = useCRUDRolePermission();

  const { mutate: createRolePers, isPending: isLoadingCreate } = useCreateRolePermissions();
  const { mutate: updateRolePers, isPending: isLoadingUpdate } = useUpdateRolePermissions();
  const { mutate: deleteRolePers, isPending: isLoadingDelete } = useDeleteRolePermissions();

  type RecordDataType = Exclude<typeof rolesPermisions, undefined>["rolePermissionList"][number];

  const [editRecord, setEditRecord] = useState<RecordDataType>();

  const setCreateRolePer = () => {
    setActionType("CREATE");
    setOpenDrawler(true);
  };

  const setEditRolePer = (record: RecordDataType) => {
    setActionType("EDIT");
    setEditRecord(record);
    setOpenDrawler(true);
  };

  const onCancel = () => {
    setOpenDrawler(false);
    setEditRecord(undefined);
  };

  const handleSubmitFormRolePermissions: RolePermissionFormDrawerProps["onSubmit"] = (action, formData) => {
    const perList = getPermissionList(formData.localUser_PermissionList);

    const payload = {
      cat: formData.cat,
      rolePermissionList: [
        {
          localUser_PermissionList: perList,
          localUser_RolePermissionKey: formData.localUser_RolePermissionKey,
          localUser_RolePermissionValue: formData.localUser_RolePermissionValue,
        },
      ],
      status: formData.status,
    };

    if (action === "CREATE") {
      createRolePers(payload, {
        onSuccess(data, variables, context) {
          setOpenDrawler(() => false);
        },
      });
    }
    if (action === "EDIT") {
      updateRolePers(payload, {
        onSuccess(data, variables, context) {
          setOpenDrawler(() => false);
        },
      });
    }
  };

  return (
    <React.Fragment>
      <PageContainer
        name="Danh sách nhóm chức năng"
        modelName="nhóm chức năng"
        onClick={setCreateRolePer}
        breadCrumItems={[{ title: "Nhóm chức năng" }]}
      >
        <TableListPage<RolesPermissionListResponse["result"]["rolePermissionList"][0]>
          scroll={{ x: 1000 }}
          modelName="Nhóm chức năng"
          showActionsLess={false}
          dataSource={rolesPermisions?.rolePermissionList || []}
          rowKey={"localUser_RolePermissionKey"}
          columns={columnRoleGroups}
          isLoading={isLoading}
          onEdit={(record) => setEditRolePer(record)}
          onDelete={(record) => deleteRolePers(record.localUser_RolePermissionKey)}
        />
      </PageContainer>
      <RolePermissionFormDrawer
        isOpen={isOpenDrawler}
        onClose={onCancel}
        actionType={actionType}
        initialValues={editRecord}
        onSubmit={handleSubmitFormRolePermissions}
        loading={isLoadingCreate || isLoadingUpdate}
      />
    </React.Fragment>
  );
};
export default RolePermissionPage;
