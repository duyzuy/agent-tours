import { useSplitBookingMutation } from "@/mutations/managements/booking";
import { SplitBookingData } from "./splitBooking.interface";
import { ISplitBookingPayload } from "./splitBooking.interface";
import useMessage from "@/hooks/useMessage";
const useSplitBooking = () => {
    const { mutate: makeSplit } = useSplitBookingMutation();

    const message = useMessage();
    const onSplitBooking = ({
        bookingDetails,
        bookingOrder,
        customerInfo,
    }: SplitBookingData) => {
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
