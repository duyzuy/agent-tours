"use client";
import React, { useCallback, useMemo, useState } from "react";

import TableListPage from "@/components/admin/TableListPage";
import { columns } from "./columns";
import { IRuleAndPolicyListRs } from "@/models/ruleAndPolicy.interface";

export interface DepositListProps {
    items: IRuleAndPolicyListRs["result"];
    onDelete: (id: number, cb?: () => void) => void;
}
const RuleAndPolicyList: React.FC<DepositListProps> = ({ items, onDelete }) => {
    return (
        <TableListPage<IRuleAndPolicyListRs["result"][0]>
            scroll={{ x: 1000 }}
            modelName="Chính sách"
            dataSource={items}
            rowKey={"id"}
            columns={columns}
            onDelete={(record) => onDelete(record.id)}
            showActionsLess={false}
            isLoading={false}
        />
    );
};
export default RuleAndPolicyList;
