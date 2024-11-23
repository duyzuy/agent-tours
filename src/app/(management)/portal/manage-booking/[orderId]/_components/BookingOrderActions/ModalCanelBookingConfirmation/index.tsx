import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import FormItem from "@/components/base/FormItem";
import { Form } from "antd";
import useCancelBookingOrder from "../../../../modules/useCancelBookingOrder";
import { IBookingOrderCancelPayload } from "../../../../modules/bookingOrder.interface";
import { useRouter } from "next/navigation";
interface Props {
  onConfirm?: () => void;
  onCancel?: () => void;
  isShowModal?: boolean;
  title?: string;
  descriptions?: string;
  confirmLoading?: boolean;
  render?: () => React.ReactNode;
  orderId: number;
}
const ModalCancelBookingConfirmation: React.FC<Props> = ({
  onConfirm,
  orderId,
  isShowModal,
  onCancel,
  title = "",
  descriptions = "",
  confirmLoading = false,
  render,
}) => {
  const router = useRouter();
  const { onCancelBookingOrder } = useCancelBookingOrder();
  const [cancelBookingData, setCancelBookingData] = useState<IBookingOrderCancelPayload>({
    bookingOrder: { recId: orderId, rmk4: "" },
  });

  const onConfirmCancelBookingOrder = () =>
    onCancelBookingOrder?.(cancelBookingData, () => {
      router.push("/portal/manage-booking/order-list");
      onCancel?.();
    });

  const renderModalFooter = () => {
    return (
      <div className="px-2 flex items-center flex-1 justify-center">
        <Button onClick={onCancel} className="w-28">
          Đóng
        </Button>
        <Button onClick={onConfirm} type="primary" danger className="w-28">
          Đồng ý
        </Button>
      </div>
    );
  };

  return (
    <Modal open={isShowModal} onCancel={onCancel} footer={renderModalFooter} width={420} closeIcon={null}>
      <div className="body pt-4">
        <div className="icon text-red-500 text-center">
          <ExclamationCircleOutlined className="text-5xl" />
        </div>
        <div className="content py-2 text-center">
          <p className="font-bold text-center py-2 text-lg">{title}</p>
          <p className="text-gray-500">{descriptions}</p>
          <div className="h-8"></div>
          <Form layout="vertical">
            <FormItem required>
              <Input.TextArea
                placeholder="Lý do huỷ"
                name="rmk4"
                onChange={(ev) =>
                  setCancelBookingData((prev) => ({
                    ...prev,
                    bookingOrder: {
                      ...prev?.bookingOrder,
                      rmk4: ev.target.value,
                    },
                  }))
                }
              />
            </FormItem>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCancelBookingConfirmation;
