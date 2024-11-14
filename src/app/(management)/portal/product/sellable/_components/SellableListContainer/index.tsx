"use client";
import React, { useState } from "react";
import TableListPage from "@/components/admin/TableListPage";
import { SellableConfirmFormData, SellableListRs } from "@/models/management/core/sellable.interface";
import { sellableColumns } from "./sellableColumns";
import { Status } from "@/models/common.interface";
import { PaginationProps } from "antd";
import { ITemplateSellableDetail } from "@/models/management/core/templateSellable.interface";
import { useRouter } from "next/navigation";
import DrawerSellableApproval, { DrawerSellableApprovalProps } from "./DrawerSellableApproval";
export interface SellableListProps {
  dataSource?: SellableListRs["result"];
  templateSellable?: ITemplateSellableDetail;
  pageSize?: number;
  pageCurrent?: number;
  totalItems?: number;
  isLoading?: boolean;
  render?: () => React.ReactNode;
  onApproval?: (record: SellableConfirmFormData, cb?: () => void) => void;
  onChangePageSellable?: PaginationProps["onChange"];
}

const SellableListContainer: React.FC<SellableListProps> = ({
  dataSource = [],
  isLoading,
  pageSize,
  pageCurrent,
  totalItems,
  templateSellable,
  onApproval,
  onChangePageSellable,
  render,
}) => {
  const [showDrawerApproval, setShowDrawerApproval] = useState(false);
  const [approvalRecord, setApprovalRecord] = useState<SellableListRs["result"][0]>();

  const router = useRouter();

  // const onCloseDrawerAndResetRecord = () => {
  //   setShowDrawerApproval(false);
  //   setApprovalRecord(undefined);
  // };

  // const setApproval = (record: SellableListRs["result"][0]) => {
  //   setApprovalRecord(record);
  //   setShowDrawerApproval(true);
  // };

  // const handleApproval: DrawerSellableApprovalProps["onSubmit"] = (formData) => {
  //   onApproval(formData, () => {
  //     setShowDrawerApproval(false);
  //     setApprovalRecord(undefined);
  //   });
  // };

  return (
    <React.Fragment>
      {render?.()}
      <TableListPage<SellableListRs["result"][0]>
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
          position: ["bottomRight"],
          hideOnSinglePage: true,
        }}
        // onApproval={(record) => setApproval(record)}
        hideApproval={({ status }) => status === Status.OK}
        showActionsLess={false}
        onView={(record) => router.push(`/portal/product/sellable/${record.recId}`)}
        hideEdit={({ status }) => status === Status.QQ || status === Status.OK}
      />

      {/* {approvalRecord && templateSellable && (
        <DrawerSellableApproval
          isOpen={showDrawerApproval}
          sellableName={approvalRecord?.code}
          inventoryTypeList={templateSellable.inventoryTypeList}
          onCancel={onCloseDrawerAndResetRecord}
          initialValues={approvalRecord}
          onSubmit={handleApproval}
        />
      )} */}
    </React.Fragment>
  );
};
export default SellableListContainer;
