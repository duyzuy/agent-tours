import {
    useCreateFormOfPaymentMutation,
    useApprovalFormOfPaymentMutation,
    useDeleteFormOfPaymentMutation,
} from "@/mutations/managements/booking";
import { FOPFormData } from "./formOfPayment.interface";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryCore } from "@/queries/var";
export const useFormOfPayment = () => {
    const { mutate: createFormOfPayment } = useCreateFormOfPaymentMutation();
    const { mutate: approvalFormOfpayment } =
        useApprovalFormOfPaymentMutation();

    const { mutate: makeDelete } = useDeleteFormOfPaymentMutation();

    const message = useMessage();
    const queryClient = useQueryClient();

    const onCreateFormOfPayment = (data: FOPFormData, cb?: () => void) => {
        createFormOfPayment(data, {
            onSuccess(data, variables, context) {
                console.log(data, variables, context);
                message.success("Tạo thành công");
                cb?.();
                queryClient.invalidateQueries({
                    queryKey: [queryCore.GET_BOOKING_ORDER_DETAIL],
                });
            },
            onError(error, variables, context) {
                message.error(error.message);
                console.log(error, variables, context);
            },
        });
    };

    const onApproval = (recId: number) => {
        approvalFormOfpayment(recId, {
            onSuccess(data, variables, context) {
                console.log(data, variables, context);
                message.success("Duyệt thành công");
                queryClient.invalidateQueries({
                    queryKey: [queryCore.GET_BOOKING_ORDER_DETAIL],
                });
            },
            onError(error, variables, context) {
                message.error(error.message);
                console.log(error, variables, context);
            },
        });
    };

    const onDelete = (recId: number) => {
        makeDelete(recId, {
            onSuccess(data, variables, context) {
                console.log(data, variables, context);
                message.success("Xoá thành công.");
                queryClient.invalidateQueries({
                    queryKey: [queryCore.GET_BOOKING_ORDER_DETAIL],
                });
            },
            onError(error, variables, context) {
                message.error(error.message);
                console.log(error, variables, context);
            },
        });
    };

    return {
        onCreateFormOfPayment,

        onApproval: onApproval,
        onDelete,
    };
};
