"use client";
import React, { useMemo, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import { useGetLocalUserList } from "@/queries/localUser";
import { ILocalUserPayload, ILocalUserList } from "@/model/LocalUser.interface";

import TableListPage from "@/components/admin/TableListPage";

import { useGetRoles } from "@/queries/role";

const MemberPage: React.FC = () => {
    return (
        <PageContainer
            name="Danh sách thành viên đăng ký"
            onClick={() => {}}
            modelName="Thành viên"
        >
            {/* <TableListPage<ILocalUserList["result"][0]>
                scroll={{ x: 1200 }}
                modelName="Tài khoản"
                columns={userColumns}
                dataSource={userList}
                isLoading={isLoading}
                onEdit={(record) =>
                    onHandleDrawler({ type: EActionType.EDIT, record })
                }
                onDelete={(record) => onDeleteUser(record.recId)}
            /> */}
            {/* <DrawlerUserForm
                isOpen={isOpenDrawler}
                onCancel={onCancel}
                actionType={actionType}
                initialValues={editRecord}
                onSubmit={handleSubmitFormData}
                roles={roleList}
                errors={
                    actionType === EActionType.CREATE ? errors : updateErrors
                }
            /> */}
        </PageContainer>
    );
};
export default MemberPage;
