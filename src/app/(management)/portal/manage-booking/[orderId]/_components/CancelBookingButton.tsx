import { Button } from "antd";
import { useCallback, useState } from "react";
import ModalCancelBookingConfirmation from "./BookingOrderActions/ModalCanelBookingConfirmation";

interface CancelBookingButtonProps {
  orderId: number;
}
const CancelBookingButton = ({ orderId }: CancelBookingButtonProps) => {
  const [isShowModalConfirm, setShowModalConfirm] = useState(false);

  const onShowModalCancelBooking = useCallback(() => setShowModalConfirm(true), []);
  const onCloseModalCancelBooking = useCallback(() => setShowModalConfirm(false), []);
  return (
    <>
      <Button type="text" className="!text-rose-700 !bg-rose-100 hover:!bg-rose-200" onClick={onShowModalCancelBooking}>
        Huỷ đặt chỗ
      </Button>
      <ModalCancelBookingConfirmation
        orderId={orderId}
        isShowModal={isShowModalConfirm}
        title="Huỷ đặt chỗ!"
        descriptions="Bạn chắc chắn muốn huỷ đặt chỗ?"
        onCancel={onCloseModalCancelBooking}
      />
    </>
  );
};
export default CancelBookingButton;
