import { useCreateCommentMutation } from "@/mutations/managements/booking";

import useMessage from "@/hooks/useMessage";
import { MutateOptions, useQueryClient } from "@tanstack/react-query";
import { queryCore } from "@/queries/var";
import { IOrderDetailRs } from "@/models/management/booking/order.interface";
import { BaseResponse } from "@/models/common.interface";

export type UseAddCommentType = {
  onAddComment: (
    data: { orderId: number; comment: string },
    options?: MutateOptions<IOrderDetailRs, BaseResponse<null>, { orderId: number; comment: string }, unknown>,
  ) => void;
};

export const useAddComment = () => {
  const { mutate: addComment, isPending } = useCreateCommentMutation();

  const message = useMessage();
  const queryClient = useQueryClient();

  const onAddComment: UseAddCommentType["onAddComment"] = (data, options) => {
    addComment(data, {
      onSuccess(data, variables, context) {
        message.success("Thêm thành công.");
        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_BOOKING_ORDER_DETAIL],
        });

        options?.onSuccess?.(data, variables, context);
      },
      onError(error, variables, context) {
        message.error(error.message);
        options?.onError?.(error, variables, context);
      },
    });
  };

  return {
    isPending,
    onAddComment,
  };
};
