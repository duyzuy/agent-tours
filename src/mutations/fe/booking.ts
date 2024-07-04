import { useMutation } from "@tanstack/react-query";

import { feBookingAPIs } from "@/services/fe/booking";
import { DiscountType } from "@/models/management/core/discountPolicy.interface";
import { FeBookingPayload } from "@/models/fe/booking.interface";
import { FeReservationResponse } from "@/models/fe/reservation.interface";
import { BaseResponse } from "@/models/common.interface";

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
    return useMutation<
        FeReservationResponse,
        BaseResponse<null>,
        {
            payload: FeBookingPayload;
            token: string;
        },
        unknown
    >({
        mutationFn: ({
            payload,
            token,
        }: {
            payload: FeBookingPayload;
            token: string;
        }) => feBookingAPIs.createBooking(payload, token),
    });
};
