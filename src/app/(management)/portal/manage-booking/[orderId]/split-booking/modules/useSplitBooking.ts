import { useSplitBookingToOnceOrderMutation, useSplitBookingInTwoOrderMutation } from "@/mutations/managements/booking";
import { SplitBookingFormData } from "./splitBooking.interface";
import { ISplitBookingPayload } from "./splitBooking.interface";
import useMessage from "@/hooks/useMessage";
import { MutateOptions, useQueryClient } from "@tanstack/react-query";
import { queryCore } from "@/queries/var";
import { useRouter } from "next/navigation";
import { IOrderDetailRs } from "@/models/management/booking/order.interface";
import { BaseResponse } from "@/models/common.interface";

export type SplitTypes = "SplitToOnce" | "SplitToTwo";

export type UseSplitBooking = {
  onSplitBooking: (
    splitType: SplitTypes,
    data: SplitBookingFormData,
    options?: MutateOptions<IOrderDetailRs, BaseResponse<null>, ISplitBookingPayload, unknown>,
  ) => void;
};
const useSplitBooking = () => {
  const { mutate: makeSplitInTwo } = useSplitBookingInTwoOrderMutation();
  const { mutate: makeSplitToOnce } = useSplitBookingToOnceOrderMutation();

  const message = useMessage();
  const queryClient = useQueryClient();
  const router = useRouter();
  const onSplitBooking: UseSplitBooking["onSplitBooking"] = (splitType, data, options) => {
    const { bookingOrder, bookingDetails, customerInfo, invoiceInfo } = data;

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
      bookingDetails: bookingDetails.reduce<ISplitBookingPayload["bookingDetails"]>((acc, bkItem) => {
        acc = [
          ...acc,
          {
            booking: {
              recId: bkItem.recId,
            },
          },
        ];
        return acc;
      }, []),
    };

    const splitBookingFn = splitType === "SplitToTwo" ? makeSplitInTwo : makeSplitToOnce;

    splitBookingFn(payload, {
      onSuccess: (data, variables, context) => {
        message.success("Tách booking thành công.");
        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_BOOKING_ORDER_DETAIL],
        });
        router.push(`./portal/manage-booking/${variables.bookingOrder?.recId}`);
        options?.onSuccess?.(data, variables, context);
      },
      onError(error, variables, context) {
        message.error(error.message);
        options?.onError?.(error, variables, context);
      },
    });
  };

  return {
    onSplitBooking,
  };
};
export default useSplitBooking;
