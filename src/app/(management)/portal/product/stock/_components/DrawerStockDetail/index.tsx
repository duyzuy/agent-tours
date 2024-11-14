import React from "react";
import { Drawer, Tag, List, Divider } from "antd";

import { Status } from "@/models/common.interface";
import { IStockListOfInventoryRs } from "@/models/management/core/stock.interface";
import { StockAdjustFormData, StockConfirmFormData } from "../../modules/stock.interface";
import { formatDate } from "@/utils/date";
import { useGetStockDetailInventoryCoreQuery } from "@/queries/core/stockInventory";
import StockConfirmationForm from "./StockConfirmationForm";
import StockAdjustmentForm from "./StockAdjustmentForm";
import classNames from "classnames";

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
      width={550}
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
          <ContentDetailList
            items={[
              { label: "#ID", value: initialValues?.recId },
              { label: "Loại dịch vụ", value: initialValues?.inventoryType },
              { label: "Loại kho", value: initialValues?.type },
              { label: "Cap", value: initialValues?.cap },
              { label: "Khả dụng", value: initialValues?.available },
              { label: "Đã bán", value: initialValues?.used },
              { label: "Đang còn", value: initialValues?.open },
              {
                label: "Ngày mở bán",
                value: (
                  <span>
                    <span className="block">{formatDate(initialValues.validFrom)}</span>
                    <span className="block">{formatDate(initialValues.validTo)}</span>
                  </span>
                ),
              },
              {
                label: "Ngày sử dụng",
                value: (
                  <span>
                    <span className="block">{formatDate(initialValues.startDate)}</span>
                    <span className="block">{formatDate(initialValues.endDate)}</span>
                  </span>
                ),
              },
              { label: "Mô tả", value: initialValues?.description },
              {
                label: "Trạng thái",
                value: (
                  <Tag
                    color={
                      (initialValues?.status === Status.XX && "orange") ||
                      (initialValues?.status === Status.OK && "green") ||
                      "red"
                    }
                  >
                    {(initialValues?.status === Status.XX && "Đã xoá") ||
                      (initialValues?.status === Status.OK && "Đã duyệt") ||
                      "Đã xoá"}
                  </Tag>
                ),
              },
            ]}
          />
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

const ContentDetailList: React.FC<{
  items: { label?: string; value?: React.ReactNode | string }[];
  className?: string;
}> = ({ items, className = "" }) => {
  return (
    <div
      className={classNames("grid lg:grid-cols-3 grid-cols-2 gap-4", {
        [className]: className,
      })}
    >
      {items.map((item, _index) => (
        <ContentDetailItem key={_index} {...item} />
      ))}
    </div>
  );
};
const ContentDetailItem: React.FC<{ label?: string; value?: React.ReactNode | string; className?: string }> = ({
  label,
  value,
  className = "",
}) => {
  return (
    <div
      className={classNames({
        [className]: className,
      })}
    >
      <span className="block text-xs text-gray-500">{label}</span>
      <span className="block break-words">{value}</span>
    </div>
  );
};
