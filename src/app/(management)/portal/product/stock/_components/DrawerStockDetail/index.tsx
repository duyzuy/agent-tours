import React from "react";
import { Drawer, Tag, List, Divider } from "antd";

import { Status } from "@/models/common.interface";
import { IStockListOfInventoryRs } from "@/models/management/core/stock.interface";
import { StockAdjustFormData, StockConfirmFormData } from "../../modules/stock.interface";
import { formatDate } from "@/utils/date";
import { useGetStockDetailInventoryCoreQuery } from "@/queries/core/stockInventory";
import StockConfirmationForm from "./StockConfirmationForm";
import StockAdjustmentForm from "./StockAdjustmentForm";
import { ContentDetailList } from "@/components/admin/ContentDetailList";
import StockHistoryList from "./StockHistoryList";

export enum EActionType {
  EDIT = "edit",
  APPROVAL = "approval",
}
export type TDrawerStockDetailAction = {
  type: EActionType;
  record: IStockListOfInventoryRs["result"][0];
};

export interface DrawerStockDetailProps {
  isOpen?: boolean;
  onCancel: () => void;
  initialValues?: IStockListOfInventoryRs["result"][0];
  actionType?: EActionType;
  onApproval?: (formData: StockConfirmFormData) => void;
  onAdjust?: (formData: StockAdjustFormData) => void;
}

const DrawerStockDetail: React.FC<DrawerStockDetailProps> = ({
  actionType,
  onCancel,
  onApproval,
  onAdjust,
  isOpen,
  initialValues,
}) => {
  return (
    <Drawer
      title={initialValues?.code ?? null}
      destroyOnClose
      width={650}
      onClose={onCancel}
      open={isOpen}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      {initialValues && initialValues.status === Status.QQ && (
        <StockConfirmationForm
          initialValues={initialValues}
          isDisabled={actionType !== EActionType.APPROVAL}
          onSubmit={onApproval}
        />
      )}
      {initialValues && initialValues.status !== Status.QQ && (
        <>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <ContentDetailList.Item label="#ID" value={initialValues?.recId} />
            <ContentDetailList.Item label="Loại dịch vụ" value={initialValues?.inventoryType} />
            <ContentDetailList.Item label="Loại kho" value={initialValues?.type} />
            <ContentDetailList.Item label="Khả dụng" value={initialValues?.available} />
            <ContentDetailList.Item
              label="Đang còn"
              value={<span className="text-emerald-600">{initialValues?.open}</span>}
            />
            <ContentDetailList.Item
              label="Đã bán"
              value={<span className="text-red-600">{initialValues?.used}</span>}
            />
          </div>
          <Divider />
          <div className="grid grid-cols-2 gap-4">
            <ContentDetailList.Item
              label="Ngày mở bán"
              value={
                <div>
                  <div className="flex items-center">
                    <span className="w-8 text-red-600 inline-block text-xs">Từ</span>
                    {formatDate(initialValues.validFrom)}
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-amber-600 inline-block text-xs">Đến</span>
                    {formatDate(initialValues.validTo)}
                  </div>
                </div>
              }
            />
            <ContentDetailList.Item
              label="Ngày sử dụng"
              value={
                <div>
                  <div className="flex items-center">
                    <span className="w-8 text-red-600 inline-block text-xs">Từ</span>
                    {formatDate(initialValues.startDate)}
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-amber-600 inline-block text-xs">Đến</span>
                    {formatDate(initialValues.endDate)}
                  </div>
                </div>
              }
            />
          </div>
          <Divider />
          <ContentDetailList.Item
            direction="horizontal"
            label="Mô tả"
            value={<p>{initialValues?.description}</p>}
            className="mb-3"
          />
          <ContentDetailList.Item
            direction="horizontal"
            label="Log"
            value={initialValues?.logStatus}
            className="mb-3"
          />
          <ContentDetailList.Item
            direction="horizontal"
            label="Trạng thái"
            value={
              <Tag
                color={
                  (initialValues?.status === Status.XX && "orange") ||
                  (initialValues?.status === Status.OK && "green") ||
                  "red"
                }
                bordered={false}
              >
                {(initialValues?.status === Status.XX && "Đã xoá") ||
                  (initialValues?.status === Status.OK && "Đã duyệt") ||
                  "Đã xoá"}
              </Tag>
            }
          />
          <Divider />
          <div className="grid grid-cols-2 gap-4">
            <ContentDetailList.Item label="Ngày tạo" value={formatDate(initialValues?.sysFstUpdate)} />
            <ContentDetailList.Item label="Người tạo" value={initialValues?.sysFstUser} />
            <ContentDetailList.Item
              label="Ngày cập nhật"
              value={initialValues?.sysLstUpdate ? formatDate(initialValues?.sysLstUpdate) : "--"}
            />
            <ContentDetailList.Item label="Người cập nhật" value={initialValues?.sysLstUser || "--"} />
          </div>

          <Divider />

          <StockHistoryList inventoryStockId={initialValues.recId} enabled={initialValues.status === Status.OK} />
        </>
      )}
    </Drawer>
  );
};
export default DrawerStockDetail;
