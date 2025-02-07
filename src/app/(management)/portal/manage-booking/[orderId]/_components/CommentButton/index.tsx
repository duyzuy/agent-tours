import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import CommentContainerDrawer from "./CommentContainerDrawer";

interface CommentButtonProps {
  orderId: number;
  comments: any[];
}
const CommentButton = ({ orderId, comments }: CommentButtonProps) => {
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
      <CommentContainerDrawer
        orderId={orderId}
        items={comments}
        isOpen={showComment}
        onClose={() => setShowComment(false)}
      />
    </>
  );
};
export default CommentButton;
