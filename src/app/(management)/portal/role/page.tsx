"use client";
import React, { useCallback, useMemo, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import { useGetRoles } from "@/queries/role";
import TableListPage from "@/components/admin/TableListPage";
import { columnRoleGroups } from "./columns";
import { RolesPermissionListResponse } from "@/models/management/rolePermission.interface";
import DrawerRole from "./_components/DrawerRole";

import { DrawerRoleProps } from "./_components/DrawerRole";
import useCRUDRole from "./modules/useCRUDRole";

const RolePage = () => {
  const { data: roles, isLoading } = useGetRoles();

  const [editRecord, setEditRecord] = useState<RolesPermissionListResponse["result"]["roleList"][number]>();
  const [actionType, setActionType] = useState<DrawerRoleProps["actionType"]>();
  const [isOpenDrawler, setOpenDrawler] = useState(false);

  const { onCreate, onDelete, onUpdate } = useCRUDRole();

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

  const handleSubmitFormData = useCallback<Required<DrawerRoleProps>["onSubmit"]>((action, data) => {
    action === "CREATE" &&
      onCreate(data, {
        onSuccess(data, variables, context) {
          setOpenDrawler(false);
        },
      });
    action === "EDIT" &&
      onUpdate(data, {
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
          onDelete={(record) => onDelete(record.localUser_RoleKey)}
          isLoading={isLoading}
        />
      </PageContainer>

      <DrawerRole
        isOpen={isOpenDrawler}
        actionType={actionType}
        onClose={setCancel}
        initialValues={editRecord}
        onSubmit={handleSubmitFormData}
      />
    </React.Fragment>
  );
};
export default RolePage;
