"use client";
import React, { useState } from "react";
import TableListPage from "@/components/admin/TableListPage";
import { SellableListRs } from "@/models/management/core/sellable.interface";
import { sellableColumns } from "./sellableColumns";
import { PaginationProps } from "antd";
import { ITemplateSellableDetail } from "@/models/management/core/templateSellable.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
export interface SellableListProps {
  dataSource?: SellableListRs["result"];
  templateSellable?: ITemplateSellableDetail;
  inventoryTypeList?: EInventoryType[];
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
  return (
    <React.Fragment>
      {render?.()}
      <TableListPage<SellableListRs["result"][number]>
        dataSource={dataSource}
        scroll={{ x: 1400 }}
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
      />
    </React.Fragment>
  );
};
export default SellableListContainer;
