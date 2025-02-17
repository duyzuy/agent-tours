import { Button, Divider, List, Popover, PopoverProps, Tag } from "antd";
import { useGetStockDetailInventoryCoreQuery } from "@/queries/core/stockInventory";
import { formatDate } from "@/utils/date";
import StockAdjustmentForm, { StockAdjustmentFormProps } from "./StockAdjustmentForm";
import { useAdjustStockQuantity } from "../../modules/useAdjustStockQuantity";
import { useState } from "react";

interface StockHistoryListProps {
  inventoryStockId: number;
  enabled?: boolean;
}
const StockHistoryList: React.FC<StockHistoryListProps> = ({ inventoryStockId, enabled = false }) => {
  const [open, setOpen] = useState(false);
  const { data: stockDetailList, isLoading } = useGetStockDetailInventoryCoreQuery({
    inventoryStockId: inventoryStockId,
    enabled: enabled,
  });

  const { mutate: adjustQuantity, isPending } = useAdjustStockQuantity();

  const onOpenChange: PopoverProps["onOpenChange"] = (newOpen) => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleAdjust: StockAdjustmentFormProps["onSubmit"] = (data) => {
    adjustQuantity(data, {
      onSuccess(data, variables, context) {
        setOpen(false);
      },
    });
  };

  return (
    <>
      <div className="flex items-center gap-x-2">
        <h3 className="font-semibold text-lg">Lịch sử điều chỉnh</h3>
        <Popover
          open={open}
          trigger="click"
          onOpenChange={onOpenChange}
          destroyTooltipOnHide={true}
          content={
            <StockAdjustmentForm
              inventoryStockId={inventoryStockId}
              onSubmit={handleAdjust}
              onCancel={handleCancel}
              loading={isPending}
              className="w-[320px]"
            />
          }
        >
          <Button size="small" type="dashed">
            Điều chỉnh
          </Button>
        </Popover>
      </div>

      <Divider />
      <List
        itemLayout="horizontal"
        dataSource={stockDetailList || []}
        loading={isLoading}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              title={<Tag color="blue">{item.cat}</Tag>}
              description={
                <div className="description pt-2">
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
    </>
  );
};
export default StockHistoryList;
