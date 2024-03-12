import { useCancelBookingOrderMutation } from "@/mutations/managements/booking";
import { IBookingOrderCancelPayload } from "./bookingOrder.interface";
import useMessage from "@/hooks/useMessage";
const useCancelBookingOrder = () => {
    const { mutate: makeCancelBookingOrder } = useCancelBookingOrderMutation();

    const message = useMessage();
    const onCancelBookingOrder = (
        payload: IBookingOrderCancelPayload,
        cb?: () => void,
    ) => {
        makeCancelBookingOrder(payload, {
            onSuccess(data, variables, context) {
                message.success("Huỷ booking thành công.");
                cb?.();
            },
            onError(error, variables, context) {
                console.log(error);
            },
        });
    };

    return {
        onCancelBookingOrder,
    };
};
export default useCancelBookingOrder;
