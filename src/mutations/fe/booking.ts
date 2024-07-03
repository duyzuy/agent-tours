import { useMutation } from "@tanstack/react-query";

import { feBookingAPIs } from "@/services/fe/booking";
import { DiscountType } from "@/models/management/core/discountPolicy.interface";
import { FeBookingPayload } from "@/models/fe/booking.interface";

export const useGetServiceListMutation = () => {
    return useMutation({
        mutationFn: (sellableId?: number) =>
            feBookingAPIs.getServiceList(sellableId),
    });
};

export const useCheckCouponMutation = () => {
    return useMutation({
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
    return useMutation({
        mutationFn: ({
            payload,
            token,
        }: {
            payload: FeBookingPayload;
            token: string;
        }) => feBookingAPIs.createBooking(payload, token),
    });
};
