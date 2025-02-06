import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface SplitBookingButtonProps {
  orderId: number;
}
const SplitBookingButton = ({ orderId }: SplitBookingButtonProps) => {
  const router = useRouter();
  const [isStartSplitBooking, startSplitBookingTransition] = useTransition();

  const onSplitBooking = () => {
    startSplitBookingTransition(() => router.push(`/portal/manage-booking/${orderId}/split-booking`));
  };

  return (
    <Button
      type="text"
      className="!text-blue-600 !bg-blue-100 hover:!bg-blue-200"
      loading={isStartSplitBooking}
      onClick={onSplitBooking}
    >
      Tách đặt chỗ
    </Button>
  );
};
export default SplitBookingButton;
