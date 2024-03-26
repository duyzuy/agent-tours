import { useSplitBookingMutation } from "@/mutations/managements/booking";
import { SplitBookingData } from "./splitBooking.interface";
import { ISplitBookingPayload } from "./splitBooking.interface";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryCore } from "@/queries/var";
import { useRouter } from "next/navigation";
const useSplitBooking = () => {
    const { mutate: makeSplit } = useSplitBookingMutation();

    const message = useMessage();
    const queryClient = useQueryClient();
    const router = useRouter();
    const onSplitBooking = (
        { bookingDetails, bookingOrder, customerInfo }: SplitBookingData,
        cb?: () => void,
    ) => {
        const payload: ISplitBookingPayload = {
            bookingOrder: { ...bookingOrder },
            custAddress: customerInfo?.custAddress,
            custEmail: customerInfo?.custEmail,
            custName: customerInfo?.custName,
            custPhoneNumber: customerInfo?.custPhoneNumber,
            bookingDetails: bookingDetails.reduce<
                ISplitBookingPayload["bookingDetails"]
            >((acc, bkItem) => {
                acc = [
                    ...acc,
                    {
                        booking: {
                            recId: bkItem.booking.recId,
                        },
                    },
                ];
                return acc;
            }, []),
        };

        makeSplit(payload, {
            onSuccess: (data, variables) => {
                console.log(data, variables);
                message.success("Tách booking thành công.");
                queryClient.invalidateQueries({
                    queryKey: [queryCore.GET_BOOKING_ORDER_DETAIL],
                });
                router.push(
                    `./portal/manage-booking/${variables.bookingOrder?.recId}`,
                );
                cb?.();
            },
            onError(error) {
                message.error(error.message);
            },
        });
    };

    return {
        onSplitBooking,
    };
};
export default useSplitBooking;
