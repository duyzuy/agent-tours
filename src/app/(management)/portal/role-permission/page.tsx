"use client";
import React, { useMemo, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";

import DrawlerRolePermission from "./_components/DrawlerRolePermission";

import { RolesPermissionListResponse } from "@/models/management/rolePermission.interface";
import { useGetRolePermission } from "@/queries/role";
import TableListPage from "@/components/admin/TableListPage";
import { columnRoleGroups } from "./columns";
import useCRUDRolePermission from "./modules/useCRUDRolePermission";
import { TDrawlerRolePermission, DrawlerRolePermissionProps } from "./_components/DrawlerRolePermission";

const RolePermissionPage = () => {
  const { data: rolesPermisions, isLoading } = useGetRolePermission();

  const [actionType, setActionType] = useState<DrawlerRolePermissionProps["actionType"]>();
  const [isOpenDrawler, setOpenDrawler] = useState(false);
  const { onCreate, onDelete, onUpdate } = useCRUDRolePermission();

  const [editRecord, setEditRecord] = useState<RolesPermissionListResponse["result"]["rolePermissionList"][0]>();

  const onHandleDrawlerRolePermission = (actions: TDrawlerRolePermission) => {
    if (actions.action === "EDIT") {
      setEditRecord(() => actions.record);
    } else {
      setEditRecord(() => undefined);
    }
    setOpenDrawler(true);
    setActionType(() => actions.action);
  };
  const onCancelEdit = () => {
    setOpenDrawler(false);
    setEditRecord(undefined);
  };

  /**
   * Handle submit form data.
   * @param actionType
   * @param payload
   */
  const handleSubmitFormRolePermissions: DrawlerRolePermissionProps["onSubmit"] = (action, formData) => {
    if (action === "CREATE") {
      onCreate(formData, {
        onSuccess(data, variables, context) {
          setOpenDrawler(() => false);
        },
      });
    }
    if (action === "EDIT") {
      onUpdate(formData, {
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
        onClick={() =>
          onHandleDrawlerRolePermission({
            action: "CREATE",
          })
        }
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
          onEdit={(record) =>
            onHandleDrawlerRolePermission({
              action: "EDIT",
              record,
            })
          }
          onDelete={(record) => onDelete(record.localUser_RolePermissionKey)}
        />
      </PageContainer>
      <DrawlerRolePermission
        isOpen={isOpenDrawler}
        onClose={onCancelEdit}
        actionType={actionType}
        initialValues={editRecord}
        onSubmit={handleSubmitFormRolePermissions}
      />
    </React.Fragment>
  );
};
export default RolePermissionPage;
