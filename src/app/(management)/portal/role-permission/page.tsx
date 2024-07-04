"use client";
import React, { useMemo, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";

import DrawlerRolePermission from "./_components/DrawlerRolePermission";
import { useGetPermissions } from "@/queries/role";
import {
    IRolesPermissionsRs,
    TRolePermissionPayload,
} from "@/models/management/role.interface";
import { useGetRolePermission } from "@/queries/role";
import TableListPage from "@/components/admin/TableListPage";
import { columnRoleGroups } from "./columns";

import useCreateRolePermission from "./modules/useCreateRolePermission";
import useDeleteRolePermissions from "./modules/useDeleteRolePermission";
import useUpdateRolePermission from "./modules/useUpdateRolePermission";
import {
    TDrawlerRolePermission,
    EActionType,
} from "./_components/DrawlerRolePermission";

const RolePermissionPage = () => {
    const { data: rolesPermisions, isLoading } = useGetRolePermission();
    const { data: permissions } = useGetPermissions();
    const [actionType, setActionType] = useState<EActionType>(
        EActionType.CREATE,
    );
    const [isOpenDrawler, setOpenDrawler] = useState(false);
    const { onCreateRolePermissions, errors } = useCreateRolePermission();
    const { onDeleteRolePermission } = useDeleteRolePermissions();

    const [editRecord, setEditRecord] =
        useState<IRolesPermissionsRs["result"]["rolePermissionList"][0]>();

    const { onUpdateRolePermissions, errors: updateErrors } =
        useUpdateRolePermission(editRecord?.localUser_RolePermissionKey || "");

    const permissionList = useMemo(() => {
        return permissions ? permissions["result"]["permissionList"] : [];
    }, [permissions]);

    const rolePermissionList = useMemo(() => {
        return rolesPermisions
            ? rolesPermisions["result"]["rolePermissionList"]
            : [];
    }, [rolesPermisions]);

    const onHandleDrawlerRolePermission = (actions: TDrawlerRolePermission) => {
        if (actions.action === EActionType.EDIT) {
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
    const handleSubmitFormRolePermissions = (
        actionType: EActionType,
        payload: TRolePermissionPayload,
    ) => {
        if (actionType === EActionType.CREATE) {
            onCreateRolePermissions(payload, () => {
                setOpenDrawler(() => false);
            });
        }

        if (actionType === EActionType.EDIT) {
            onUpdateRolePermissions(payload, () => {
                setOpenDrawler(() => false);
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
                        action: EActionType.CREATE,
                    })
                }
                breadCrumItems={[{ title: "Nhóm chức năng" }]}
            >
                <TableListPage<
                    IRolesPermissionsRs["result"]["rolePermissionList"][0]
                >
                    scroll={{ x: 1000 }}
                    modelName="Nhóm chức năng"
                    dataSource={rolePermissionList}
                    rowKey={"localUser_RolePermissionKey"}
                    columns={columnRoleGroups}
                    isLoading={isLoading}
                    onEdit={(record) =>
                        onHandleDrawlerRolePermission({
                            action: EActionType.EDIT,
                            record,
                        })
                    }
                    onDelete={(record) =>
                        onDeleteRolePermission(
                            record.localUser_RolePermissionKey,
                        )
                    }
                />
            </PageContainer>
            <DrawlerRolePermission
                isOpen={isOpenDrawler}
                onClose={onCancelEdit}
                permissionList={permissionList}
                actionType={actionType}
                initialValues={editRecord}
                onSubmit={handleSubmitFormRolePermissions}
                errors={
                    actionType === EActionType.CREATE ? errors : updateErrors
                }
            />
        </React.Fragment>
    );
};
export default RolePermissionPage;
