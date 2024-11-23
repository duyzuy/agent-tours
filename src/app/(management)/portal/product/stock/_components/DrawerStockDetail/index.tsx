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
  /**
   * Get all Stock detail history adjustment
   * only fetch if stock with status OK (Approval)
   */

  const { data: stockDetailList, isLoading } = useGetStockDetailInventoryCoreQuery({
    inventoryStockId: initialValues?.recId || 0,
    enabled: initialValues?.status === Status.OK,
  });

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
      {initialValues?.status === Status.QQ && (
        <StockConfirmationForm
          initialValues={initialValues}
          isDisabled={actionType !== EActionType.APPROVAL}
          onSubmit={onApproval}
        />
      )}
      {initialValues && initialValues?.status !== Status.QQ && (
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
          <div className="stock-adjustment-wrapper">
            <StockAdjustmentForm
              inventoryStockId={initialValues?.recId}
              onSubmit={onAdjust}
              onCancel={onCancel}
              className="mb-6"
            />
            <div className="py-3 border-b">
              <p className="font-semibold">Lịch sử điều chỉnh</p>
            </div>
            <List
              itemLayout="horizontal"
              dataSource={stockDetailList || []}
              loading={isLoading}
              renderItem={(item, index) => (
                <List.Item key={index}>
                  <List.Item.Meta
                    title={<Tag color="blue">{item.cat}</Tag>}
                    description={
                      <div className="description pt-2 text-gray-800">
                        <div className="flex gap-x-2">
                          <p className="w-32">{`Số lượng`}</p>
                          <p className="flex-1">{`: ${item.quantity ? item.quantity : "--"}`}</p>
                        </div>
                        <div className="flex gap-x-2">
                          <p className="w-32">{`Ngày cập nhật`}</p>
                          <p>{`: ${formatDate(item.sysFstUpdate)}`}</p>
                        </div>
                        <div className="flex gap-x-2">
                          <p className="w-32">{`Mô tả`}</p>
                          <p className="flex-1">{`: ${item.rmk ? item.rmk : "--"}`}</p>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        </>
      )}
    </Drawer>
  );
};
export default DrawerStockDetail;
