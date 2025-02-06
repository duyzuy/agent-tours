import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import DrawerCommentContainer from "./DrawerCommentContainer";

interface NoteBookingButtonProps {
  orderId: number;
  comments: any[];
}
const NoteBookingButton = ({ orderId, comments }: NoteBookingButtonProps) => {
  const router = useRouter();
  const [showComment, setShowComment] = useState(false);

  return (
    <>
      <Button
        type="text"
        className="!text-orange-600 !bg-orange-100 hover:!bg-orange-200"
        onClick={() => setShowComment(true)}
      >
        Ghi chú
      </Button>
      <DrawerCommentContainer
        orderId={orderId}
        items={comments}
        isOpen={showComment}
        onClose={() => setShowComment(false)}
      />
    </>
  );
};
export default NoteBookingButton;
