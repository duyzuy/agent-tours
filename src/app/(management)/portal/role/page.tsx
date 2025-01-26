"use client";
import React, { useCallback, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { columnRoleGroups } from "./columns";
import { RolesPermissionListResponse } from "@/models/management/rolePermission.interface";
import { useCreateRole, useDeleteRole, useUpdateRole, useGetRoles, getRolePermissionList } from "@/modules/admin/role";
import RoleFormDrawer, { RoleFormDrawerProps } from "@/modules/admin/role/components/RoleFormDrawer";

const RolePage = () => {
  const { data: roles, isLoading } = useGetRoles();

  const [editRecord, setEditRecord] = useState<RolesPermissionListResponse["result"]["roleList"][number]>();
  const [actionType, setActionType] = useState<RoleFormDrawerProps["actionType"]>();
  const [isOpenDrawler, setOpenDrawler] = useState(false);

  const { mutate: createRole, isPending: isLoadingCreate } = useCreateRole();
  const { mutate: updateRole, isPending: isLoadingUpdate } = useUpdateRole();
  const { mutate: deleteRole, isPending: isLoadingDelete } = useDeleteRole();

  const setCreate = () => {
    setOpenDrawler(true);
    setActionType("CREATE");
  };

  const setEdit = (record: RolesPermissionListResponse["result"]["roleList"][number]) => {
    setOpenDrawler(true);
    setActionType("EDIT");
    setEditRecord(record);
  };

  const setCancel = () => {
    setOpenDrawler(false);
    setActionType(undefined);
    setEditRecord(undefined);
  };

  const handleSubmitFormData = useCallback<Required<RoleFormDrawerProps>["onSubmit"]>((action, formData) => {
    const rolePerList = getRolePermissionList(formData.localUser_RolePermissionList);

    const payload = {
      cat: formData.cat,
      status: formData.status,
      roleList: [
        {
          localUser_RoleKey: formData.localUser_RoleKey,
          localUser_RolePermissionList: rolePerList,
          localUser_RoleValue: formData.localUser_RoleValue,
        },
      ],
    };

    action === "CREATE" &&
      createRole(payload, {
        onSuccess(data, variables, context) {
          setOpenDrawler(false);
        },
      });
    action === "EDIT" &&
      updateRole(payload, {
        onSuccess(data, variables, context) {
          setOpenDrawler(false);
        },
      });
  }, []);

  return (
    <React.Fragment>
      <PageContainer
        name="Danh sách quyền chức năng"
        modelName="quyền chức năng"
        onClick={setCreate}
        breadCrumItems={[{ title: "Quyền chức năng" }]}
      >
        <TableListPage<RolesPermissionListResponse["result"]["roleList"][number]>
          scroll={{ x: 1000 }}
          modelName="Quyền chức năng"
          dataSource={roles?.roleList || []}
          rowKey={"localUser_RoleKey"}
          columns={columnRoleGroups}
          showActionsLess={false}
          onEdit={(record) => setEdit(record)}
          onDelete={(record) => deleteRole(record.localUser_RoleKey)}
          isLoading={isLoading}
        />
      </PageContainer>

      <RoleFormDrawer
        isOpen={isOpenDrawler}
        actionType={actionType}
        onClose={setCancel}
        initialValues={editRecord}
        loading={isLoadingCreate || isLoadingUpdate}
        onSubmit={handleSubmitFormData}
      />
    </React.Fragment>
  );
};
export default RolePage;
