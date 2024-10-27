import { useState } from "react";
import { Form, Space, Input, Button } from "antd";
import FormItem from "@/components/base/FormItem";
import { RoomingHandOverFormData } from "@/app/(management)/portal/operation/modules/rooming.interface";

interface HandOverRoomingFormProps {
  operationId?: number;
  onCancel?: () => void;
  onOk?: (data: RoomingHandOverFormData) => void;
}

const HandOverRoomingForm: React.FC<HandOverRoomingFormProps> = ({ operationId, onCancel, onOk }) => {
  const initRoomingHandOverFormData = new RoomingHandOverFormData(operationId, "IN_PROGRESS", "");

  const [formData, setFormData] = useState(initRoomingHandOverFormData);

  const onChangeFormData = (
    key: keyof RoomingHandOverFormData,
    value: RoomingHandOverFormData[keyof RoomingHandOverFormData],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const onSubmit = () => {
    onOk?.(formData);
  };
  return (
    <div className="border-t pt-6">
      <h3 className="font-bold mb-3">Xác nhận và bàn giao</h3>
      <Form layout="vertical">
        <FormItem>
          <Input.TextArea
            placeholder="Ghi chú"
            value={formData.roomingListRemark}
            onChange={(ev) => onChangeFormData("roomingListRemark", ev.target.value)}
          />
        </FormItem>
        <FormItem>
          <Space>
            <Button onClick={onCancel}>Huỷ bỏ</Button>
            <Button type="primary" onClick={onSubmit}>
              Xác nhận
            </Button>
          </Space>
        </FormItem>
      </Form>
    </div>
  );
};
export default HandOverRoomingForm;
