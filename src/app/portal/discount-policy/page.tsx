"use client";
import React, { useCallback, useMemo, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import { useGetRolePermission, useGetRoles } from "@/queries/role";
import TableListPage from "@/components/admin/TableListPage";

import {
    IRolesPermissionsRs,
    TRolePayload,
} from "@/models/management/role.interface";

type TRole = IRolesPermissionsRs["result"]["roleList"][0];

const PromotionPage = () => {
    return (
        <React.Fragment>
            <PageContainer
                name="Chính sách giá giảm"
                onClick={() => {}}
                breadCrumItems={[{ title: "Chính sách giá giảm" }]}
            >
                <TableListPage<TRole>
                    scroll={{ x: 1000 }}
                    modelName="Chính sách giá giảm"
                    dataSource={[]}
                    rowKey={"localUser_RoleKey"}
                    columns={[]}
                />
            </PageContainer>
        </React.Fragment>
    );
};
export default PromotionPage;
