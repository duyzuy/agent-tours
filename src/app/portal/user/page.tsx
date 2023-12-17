"use client";
import React, { useMemo, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import { useGetLocalUserList } from "@/queries/localUser";

import DrawlerUserForm from "./components/DrawlerUserForm";
import TableListPage from "@/components/admin/TableListPage";
import { userColumns } from "./userColumns";

import { useGetRoles } from "@/queries/role";
import useCreateLocalUser from "./hooks/useCreateLocalUser";
import useUpdateLocalUser from "./hooks/useUpdateLocalUser";
import { EActionType, TDrawlerAction } from "./components/DrawlerUserForm";

import {
    ILocalUserPayload,
    ILocalUserList,
} from "@/models/management/localUser.interface";

const UserPage: React.FC = () => {
    const { data: localUsers, isLoading } = useGetLocalUserList();
    const { data: roles } = useGetRoles();

    const [isOpenDrawler, setToggleDrawler] = useState(false);
    const [actionType, setActionType] = useState<EActionType>(
        EActionType.CREATE,
    );
    const [editRecord, setEditRecord] = useState<ILocalUserList["result"][0]>();

    const { onCreateUser, errors, onClearValidationCreateError } =
        useCreateLocalUser();

    const {
        onUpdateLocalUser,
        errors: updateErrors,
        onClearValidationUpdateError,
        onUpdateLocalUserStatus,
    } = useUpdateLocalUser(editRecord?.recId || 0);

    const roleList = useMemo(() => {
        return roles ? roles["result"]["roleList"] : [];
    }, [roles]);

    const userList = useMemo(() => {
        return localUsers
            ? localUsers.result.map((item) => ({
                  ...item,
                  key: item.recId,
              }))
            : [];
    }, [localUsers]);

    const onHandleDrawler = (drawler: TDrawlerAction) => {
        setEditRecord(() =>
            drawler.type === EActionType.EDIT ? drawler.record : undefined,
        );
        setActionType(drawler.type);
        setToggleDrawler(() => true);
    };
    const onCancel = () => {
        setToggleDrawler(() => false);
        setActionType(EActionType.CREATE);
        setEditRecord(undefined);
        onClearValidationUpdateError();
        onClearValidationCreateError();
    };
    const onDeleteUser = (recordId: number) => {
        onUpdateLocalUserStatus(recordId, "XX");
    };

    const handleSubmitFormData = (
        action: EActionType,
        payload: ILocalUserPayload,
    ) => {
        if (action === EActionType.CREATE) {
            onCreateUser(payload, () => {
                setToggleDrawler(false);
            });
        }

        if (action === EActionType.EDIT) {
            onUpdateLocalUser(payload, () => {
                setToggleDrawler(false);
            });
        }
    };

    return (
        <PageContainer
            name="Danh sách Tài khoản"
            onClick={() => onHandleDrawler({ type: EActionType.CREATE })}
            modelName="Tài khoản"
        >
            <TableListPage<ILocalUserList["result"][0]>
                scroll={{ x: 1200 }}
                modelName="Tài khoản"
                columns={userColumns}
                dataSource={userList}
                isLoading={isLoading}
                onEdit={(record) =>
                    onHandleDrawler({ type: EActionType.EDIT, record })
                }
                onDelete={(record) => onDeleteUser(record.recId)}
            />
            <DrawlerUserForm
                isOpen={isOpenDrawler}
                onCancel={onCancel}
                actionType={actionType}
                initialValues={editRecord}
                onSubmit={handleSubmitFormData}
                onChangeLocalUserStatus={(recordId, status) =>
                    onUpdateLocalUserStatus(recordId, status)
                }
                roles={roleList}
                errors={
                    actionType === EActionType.CREATE ? errors : updateErrors
                }
            />
        </PageContainer>
    );
};
export default UserPage;
