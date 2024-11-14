import React, { useMemo, useState } from "react";
import classNames from "classnames";
import { Form, Input, Button, Space } from "antd";
import { isEmpty } from "lodash";
import FormItem from "@/components/base/FormItem";
import { useFormSubmit, HandleSubmit } from "@/hooks/useFormSubmit";
import { stockAdjustSchema } from "../../schema/stock.schema";
import { StockAdjustFormData } from "../../modules/stock.interface";
interface StockAdjustmentFormProps {
  inventoryStockId?: number;
  onSubmit?: (formData: StockAdjustFormData) => void;
  className?: string;
  onCancel?: () => void;
}

const StockAdjustmentForm: React.FC<StockAdjustmentFormProps> = ({
  inventoryStockId,
  onSubmit,
  className = "",
  onCancel,
}) => {
  const initFormData = new StockAdjustFormData(inventoryStockId, "", 0);
  const [formData, setFormData] = useState(initFormData);

  const { handlerSubmit, errors } = useFormSubmit({
    schema: stockAdjustSchema,
  });
  const onChangeFormData = (key: keyof StockAdjustFormData, value: string | number) => {
    if (key === "quantity") {
      if (!isNaN(value as number)) {
        value = Number(value);
      }
    }
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const isDisableButton = useMemo(() => {
    return Number(formData.quantity) === 0 || isEmpty(formData.rmk);
  }, [formData]);

  const onSubmitForm: HandleSubmit<StockAdjustFormData> = (data) => {
    onSubmit?.(data);
  };

  return (
    <div
      className={classNames({
        [className]: className,
      })}
    >
      <div className="mb-3">
        <p className="font-bold">Cập nhật số lượng kho sản phẩm</p>
      </div>
      <Form layout="vertical">
        <FormItem
          label="Số lượng cần thêm/giảm"
          required
          tooltip="Sử dụng '-' để giảm số lượng"
          validateStatus={errors?.quantity ? "error" : ""}
          help={errors?.quantity || ""}
        >
          <Input
            type="number"
            placeholder="Số lượng"
            value={formData.quantity}
            onChange={(ev) => onChangeFormData("quantity", ev.target.value)}
          />
        </FormItem>
        <FormItem label="Mô tả" required validateStatus={errors?.rmk ? "error" : ""} help={errors?.rmk || ""}>
          <Input.TextArea
            placeholder="Mô tả"
            value={formData.rmk}
            spellCheck={true}
            onChange={(ev) => onChangeFormData("rmk", ev.target.value)}
          />
        </FormItem>
        <Space>
          <Button onClick={onCancel}>Huỷ</Button>
          <Button type="primary" onClick={() => handlerSubmit(formData, onSubmitForm)} disabled={isDisableButton}>
            Thêm
          </Button>
        </Space>
      </Form>
    </div>
  );
};
export default StockAdjustmentForm;
