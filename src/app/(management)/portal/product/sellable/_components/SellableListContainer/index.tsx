"use client";
import React, { useState } from "react";
import TableListPage from "@/components/admin/TableListPage";
import { ISellable, SellableListRs } from "@/models/management/core/sellable.interface";
import { sellableColumns } from "./sellableColumns";
import { Status } from "@/models/common.interface";
import { PaginationProps } from "antd";
import { ITemplateSellableDetail } from "@/models/management/core/templateSellable.interface";
import { useRouter } from "next/navigation";
import DrawerSellableApproval, { DrawerSellableApprovalProps } from "../DrawerSellableApproval";
export interface SellableListProps {
  dataSource?: SellableListRs["result"];
  templateSellable?: ITemplateSellableDetail;
  pageSize?: number;
  pageCurrent?: number;
  totalItems?: number;
  isLoading?: boolean;
  render?: () => React.ReactNode;
  onChangePageSellable?: PaginationProps["onChange"];
}

const SellableListContainer: React.FC<SellableListProps> = ({
  dataSource = [],
  isLoading,
  pageSize,
  pageCurrent,
  totalItems,
  onChangePageSellable,
  render,
}) => {
  const [approvalRecord, setApprovalRecord] = useState<SellableListRs["result"][number]>();
  const [showDrawer, setShowDrawer] = useState(false);
  const router = useRouter();
  const handleApproval = (record: SellableListRs["result"][number]) => {
    setApprovalRecord(record);
    setShowDrawer(true);
  };
  const handleCancel = () => {
    setApprovalRecord(undefined);
    setShowDrawer(false);
  };
  const handleSubmit = () => {};
  return (
    <React.Fragment>
      {render?.()}
      <TableListPage<SellableListRs["result"][number]>
        dataSource={dataSource}
        scroll={{ x: 1600 }}
        rowKey={"recId"}
        isLoading={isLoading}
        columns={sellableColumns}
        pagination={{
          current: pageCurrent,
          pageSize: pageSize,
          onChange: onChangePageSellable,
          total: totalItems,
          position: ["bottomRight", "topRight"],
          hideOnSinglePage: true,
          showQuickJumper: false,
          size: "small",
        }}
        fixedActionsColumn={false}
        // onApproval={(record) => handleApproval(record)}
        // hideApproval={({ status }) => status === Status.OK}
        // showActionsLess={false}
        // onView={(record) => router.push(`/portal/product/sellable/${record.recId}`)}
        // hideEdit={({ status }) => status === Status.QQ || status === Status.OK}
      />
      {(approvalRecord && approvalRecord.type === "EXTRA") || (approvalRecord && approvalRecord.type === "TOUR") ? (
        <DrawerSellableApproval
          isOpen={showDrawer}
          inventoryTypeList={[]}
          productType={approvalRecord.type}
          sellableName={approvalRecord.code}
          onCancel={handleCancel}
          initialValues={approvalRecord}
          onSubmit={handleSubmit}
        />
      ) : null}
    </React.Fragment>
  );
};
export default SellableListContainer;
