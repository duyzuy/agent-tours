import { useMutation } from "@tanstack/react-query";
import { feBookingAPIs } from "@/services/fe/booking";
import { DiscountType } from "@/models/management/core/discountPolicy.interface";
import { FeBookingPayload } from "@/models/fe/booking.interface";
import { FeReservationResponse } from "@/models/fe/reservation.interface";
import { useCustomMutation } from "../useCustomMutation";

export const useGetServiceListMutation = () => {
  return useMutation({
    mutationFn: (sellableId?: number) => feBookingAPIs.getServiceList(sellableId),
  });
};

export const useCheckCouponMutation = () => {
  return useCustomMutation({
    mutationFn: (
      payload:
        | {
            code: string;
            sellableId: number;
            type: DiscountType.COUPON;
          }
        | undefined,
    ) => feBookingAPIs.checkCoupon(payload),
  });
};

export const useCreateBookingOrderMutation = () => {
  return useCustomMutation<
    FeReservationResponse,
    {
      payload: FeBookingPayload;
      token: string;
    }
  >({
    mutationFn: ({ payload, token }: { payload: FeBookingPayload; token: string }) =>
      feBookingAPIs.createBooking(payload, token),
  });
};
