import {
    useSplitBookingToOnceOrderMutation,
    useSplitBookingInTwoOrderMutation,
} from "@/mutations/managements/booking";
import { SplitBookingFormData } from "./splitBooking.interface";
import { ISplitBookingPayload } from "./splitBooking.interface";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryCore } from "@/queries/var";
import { useRouter } from "next/navigation";

export type SplitTypes = "SplitToOnce" | "SplitToTwo";
const useSplitBooking = () => {
    const { mutate: makeSplitInTwo } = useSplitBookingInTwoOrderMutation();
    const { mutate: makeSplitToOnce } = useSplitBookingToOnceOrderMutation();

    const message = useMessage();
    const queryClient = useQueryClient();
    const router = useRouter();
    const onSplitBooking = (
        splitType: SplitTypes,
        {
            bookingDetails,
            bookingOrder,
            customerInfo,
            invoiceInfo,
        }: SplitBookingFormData,
        cb?: () => void,
    ) => {
        const payload: ISplitBookingPayload = {
            bookingOrder: {
                recId: bookingOrder?.recId,
                rmk3: bookingOrder?.rmk3,
                fop: bookingOrder?.fop || [],
            },
            custAddress: customerInfo?.custAddress,
            custEmail: customerInfo?.custEmail,
            custName: customerInfo?.custName,
            custPhoneNumber: customerInfo?.custPhoneNumber,
            invoiceAddress: invoiceInfo?.invoiceAddress,
            invoiceCompanyName: invoiceInfo?.invoiceCompanyName,
            invoiceEmail: invoiceInfo?.invoiceEmail,
            invoiceName: invoiceInfo?.invoiceName,
            invoiceTaxCode: invoiceInfo?.invoiceTaxCode,
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

        console.log(payload);
        const splitBookingFn =
            splitType === "SplitToTwo" ? makeSplitInTwo : makeSplitToOnce;

        splitBookingFn(payload, {
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
