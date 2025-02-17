import React from "react";
import classNames from "classnames";
import { Form, Input, Button, Space, InputNumber, FormProps } from "antd";
import { StockAdjustFormData } from "../../modules/stock.interface";
export interface StockAdjustmentFormProps {
  inventoryStockId: number;
  className?: string;
  loading?: boolean;
  onCancel?: () => void;
  onSubmit?: (formData: StockAdjustFormData) => void;
}

type StockAdjustmentFormKeys = {
  quantity?: number;
  rmk?: string;
};
const StockAdjustmentForm: React.FC<StockAdjustmentFormProps> = ({
  inventoryStockId,
  loading,
  className = "",
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm<StockAdjustmentFormKeys>();

  const isDisableButton = Form.useWatch("quantity", form) === 0;

  const handleFinishForm: FormProps<StockAdjustmentFormKeys>["onFinish"] = (data) => {
    onSubmit?.({ ...data, inventoryStockId: inventoryStockId });
  };

  return (
    <div
      className={classNames({
        [className]: className,
      })}
    >
      <h3 className="font-semibold text-[16px] mb-6">Điều chỉnh số lượng kho dịch vụ</h3>
      <Form<StockAdjustmentFormKeys>
        form={form}
        layout="vertical"
        onFinish={handleFinishForm}
        initialValues={{ quantity: 0, rmk: "" }}
        disabled={loading}
      >
        <Form.Item<StockAdjustmentFormKeys>
          label="Số lượng cần thêm/giảm"
          required
          tooltip="Giảm nếu số lượng < 0."
          name="quantity"
          rules={[{ required: true, message: "Không bỏ trống." }]}
          className="!w-full"
        >
          <InputNumber type="number" placeholder="Số lượng" className="!w-full" />
        </Form.Item>
        <Form.Item<StockAdjustmentFormKeys>
          label="Mô tả"
          required
          rules={[{ required: true, message: "Không bỏ trống." }]}
          name="rmk"
        >
          <Input.TextArea placeholder="Mô tả" spellCheck={true} />
        </Form.Item>
        <Space>
          <Button type="primary" disabled={isDisableButton} className="w-28" htmlType="submit" loading={loading}>
            Lưu
          </Button>
          <Button onClick={onCancel} className="w-28">
            Huỷ
          </Button>
        </Space>
      </Form>
    </div>
  );
};
export default StockAdjustmentForm;
