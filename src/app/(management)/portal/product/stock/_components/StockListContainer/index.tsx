import React, { useState } from "react";
import { IStock, IStockConfirmPayload, IStockListOfInventoryRs } from "@/models/management/core/stock.interface";
import { StockAdjustFormData, StockConfirmFormData } from "../../modules/stock.interface";
import TableListPage from "@/components/admin/TableListPage";
import { stockColumns } from "./stockColumns";
import DrawerStockDetail, { DrawerStockDetailProps, EActionType } from "../DrawerStockDetail";
import { BaseResponse, Status } from "@/models/common.interface";
import { PaginationProps } from "antd";

export interface StockListContainerProps {
  items: IStockListOfInventoryRs["result"];
  pageSize: number;
  pageCurrent: number;
  totalItems: number;
  isLoading?: boolean;
  onConfirm: (
    data: StockConfirmFormData,
    cb?: (response: BaseResponse<IStock>, variables?: IStockConfirmPayload) => void,
  ) => void;
  render?: () => React.ReactNode;
  onChangeStockPage?: PaginationProps["onChange"];
}

const StockListContainer: React.FC<StockListContainerProps> = ({
  items,
  isLoading,
  pageSize,
  pageCurrent,
  totalItems,
  onConfirm,

  onChangeStockPage,
  render,
}) => {
  const [showDrawler, setShowDrawler] = useState(false);
  const [actionType, setActionType] = useState<EActionType>();
  const [stockRecord, setStockRecord] = useState<IStockListOfInventoryRs["result"][0]>();

  const handleDrawler = (action: EActionType, record: IStockListOfInventoryRs["result"][0]) => {
    setShowDrawler(true);
    setStockRecord(record);
    setActionType(action);
  };
  const onCancel = () => {
    setShowDrawler(false);
    setStockRecord(undefined);
  };

  const onApproval: DrawerStockDetailProps["onApproval"] = (data) => {
    onConfirm(data, (response, variables) => {
      // setShowDrawler(false);
      setStockRecord(response["result"]);
      setActionType(EActionType.EDIT);
    });
  };

  return (
    <React.Fragment>
      {render?.()}
      <TableListPage<IStockListOfInventoryRs["result"][0]>
        dataSource={items}
        size="small"
        scroll={{ x: 1800 }}
        rowKey={"recId"}
        isLoading={isLoading}
        columns={stockColumns}
        // fixedActionsColumn={false}
        showActionsLess={false}
        onEdit={(record) => handleDrawler(EActionType.EDIT, record)}
        hideEdit={(record) => record.status !== Status.OK}
        hideApproval={(record) => record.status !== Status.QQ}
        onApproval={(record) => handleDrawler(EActionType.APPROVAL, record)}
        pagination={{
          current: pageCurrent,
          pageSize: pageSize,
          total: totalItems,
          onChange: onChangeStockPage,
        }}
      />
      <DrawerStockDetail
        isOpen={showDrawler}
        onCancel={onCancel}
        initialValues={stockRecord}
        onApproval={onApproval}
        actionType={actionType}
      />
    </React.Fragment>
  );
};
export default StockListContainer;
