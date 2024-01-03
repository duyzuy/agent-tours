"use client";
import React, { useCallback, useMemo, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import { useGetRolePermission, useGetRoles } from "@/queries/role";
import TableListPage from "@/components/admin/TableListPage";
import { columnRoleGroups } from "./columns";
import {
    IRolesPermissionsRs,
    TRolePayload,
} from "@/models/management/role.interface";
import DrawlerRole from "./_components/DrawlerRole";

import useCreateRole from "./modules/useCreateRole";
import useDeleteRole from "./modules/useDeleteRole";
import useUpdateRole from "./modules/useUpdateRole";

import { EActionType, TDrawlerRole } from "./_components/DrawlerRole";
type TRole = IRolesPermissionsRs["result"]["roleList"][0];

const RolePage = () => {
    const { data: roles, isLoading } = useGetRoles();
    const { data: rolePermissions } = useGetRolePermission();
    const { onCreateRole, errors } = useCreateRole();
    const { onDeleteRole } = useDeleteRole();

    const [editRecord, setEditRecord] = useState<TRole>();

    const { onUpdateRole, errors: updateErrors } = useUpdateRole(
        editRecord?.localUser_RoleKey || "",
    );

    const [actionType, setActionType] = useState<EActionType>(
        EActionType.CREATE,
    );
    const [isOpenDrawler, setOpenDrawler] = useState(false);

    const roleList = useMemo(() => {
        return roles ? roles["result"]["roleList"] : [];
    }, [roles]);

    const rolePermissionList = useMemo(() => {
        return rolePermissions?.result.rolePermissionList || [];
    }, [rolePermissions]);

    const onHandleDrawlerRole = (drawlerRole: TDrawlerRole) => {
        setEditRecord(() =>
            drawlerRole.action === EActionType.EDIT
                ? drawlerRole.record
                : undefined,
        );
        setOpenDrawler(true);
        setActionType(() => drawlerRole.action);
    };

    const handleSubmitFormData = useCallback(
        (actionType: EActionType, payload: TRolePayload) => {
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
        },
        [],
    );

    return (
        <React.Fragment>
            <PageContainer
                name="Danh sách quyền chức năng"
                modelName="quyền chức năng"
                onClick={() =>
                    onHandleDrawlerRole({ action: EActionType.CREATE })
                }
                breadCrumItems={[{ title: "Quyền chức năng" }]}
            >
                <TableListPage<TRole>
                    scroll={{ x: 1000 }}
                    modelName="Quyền chức năng"
                    dataSource={roleList}
                    rowKey={"localUser_RoleKey"}
                    columns={columnRoleGroups}
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

            <DrawlerRole
                isOpen={isOpenDrawler}
                actionType={actionType}
                onClose={() => setOpenDrawler(false)}
                initialValues={editRecord}
                rolePermissionList={rolePermissionList}
                onSubmit={handleSubmitFormData}
                errors={
                    actionType === EActionType.CREATE ? errors : updateErrors
                }
            />
        </React.Fragment>
    );
};
export default RolePage;
