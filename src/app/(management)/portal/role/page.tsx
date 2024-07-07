"use client";
import React, { useCallback, useMemo, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import { useGetRolePermission, useGetRoles } from "@/queries/role";
import TableListPage from "@/components/admin/TableListPage";
import { columnRoleGroups } from "./columns";
import { IRolesPermissionsRs, TRolePayload } from "@/models/management/role.interface";
import DrawerRole from "./_components/DrawerRole";

import useCreateRole from "./modules/useCreateRole";
import useDeleteRole from "./modules/useDeleteRole";
import useUpdateRole from "./modules/useUpdateRole";

import { EActionType, TDrawerRole } from "./_components/DrawerRole";
type TRole = IRolesPermissionsRs["result"]["roleList"][0];

const RolePage = () => {
  const { data: roles, isLoading } = useGetRoles();
  const { data: rolePermissions } = useGetRolePermission();
  const { onCreateRole, errors } = useCreateRole();
  const { onDeleteRole } = useDeleteRole();

  const [editRecord, setEditRecord] = useState<TRole>();

  const { onUpdateRole, errors: updateErrors } = useUpdateRole(editRecord?.localUser_RoleKey || "");

  const [actionType, setActionType] = useState<EActionType>(EActionType.CREATE);
  const [isOpenDrawler, setOpenDrawler] = useState(false);

  const roleList = useMemo(() => {
    return roles ? roles["result"]["roleList"] : [];
  }, [roles]);

  const rolePermissionList = useMemo(() => {
    return rolePermissions?.result.rolePermissionList || [];
  }, [rolePermissions]);

  const onHandleDrawlerRole = (drawerRole: TDrawerRole) => {
    setEditRecord(() => (drawerRole.action === EActionType.EDIT ? drawerRole.record : undefined));
    setOpenDrawler(true);
    setActionType(() => drawerRole.action);
  };

  const handleSubmitFormData = useCallback((actionType: EActionType, payload: TRolePayload) => {
    if (actionType === EActionType.CREATE) {
      onCreateRole(payload, () => {
        setOpenDrawler(false);
      });
    }

    if (actionType === EActionType.EDIT) {
      onUpdateRole(payload, () => {
        setOpenDrawler(false);
      });
    }
  }, []);

  return (
    <React.Fragment>
      <PageContainer
        name="Danh sách quyền chức năng"
        modelName="quyền chức năng"
        onClick={() => onHandleDrawlerRole({ action: EActionType.CREATE })}
        breadCrumItems={[{ title: "Quyền chức năng" }]}
      >
        <TableListPage<TRole>
          scroll={{ x: 1000 }}
          modelName="Quyền chức năng"
          dataSource={roleList}
          rowKey={"localUser_RoleKey"}
          columns={columnRoleGroups}
          showActionsLess={false}
          onEdit={(record) =>
            onHandleDrawlerRole({
              action: EActionType.EDIT,
              record,
            })
          }
          onDelete={(record) => onDeleteRole(record)}
          isLoading={isLoading}
        />
      </PageContainer>

      <DrawerRole
        isOpen={isOpenDrawler}
        actionType={actionType}
        onClose={() => setOpenDrawler(false)}
        initialValues={editRecord}
        rolePermissionList={rolePermissionList}
        onSubmit={handleSubmitFormData}
        errors={actionType === EActionType.CREATE ? errors : updateErrors}
      />
    </React.Fragment>
  );
};
export default RolePage;
