import { client } from "@/services/api";
import { BaseResponse } from "@/models/common.interface";
import { PriceConfigServiceListResponse } from "@/models/fe/serviceItem.interface";
import { DiscountType } from "@/models/management/core/discountPolicy.interface";
import {
    FeBookingPayload,
    ReservationResponse,
} from "@/models/fe/booking.interface";
import { IPromotion } from "@/models/management/core/promotion.interface";

export const feBookingAPIs = {
    getServiceList: async (sellableId?: number) => {
        return await client.post<
            PriceConfigServiceListResponse,
            BaseResponse<null>
        >("localfront/BookingOrder_Search_GetSellableSsr", {
            params: {
                requestObject: {
                    sellableId,
                },
            },
        });
    },
    checkCoupon: async (
        payload:
            | {
                  code: string;
                  type: DiscountType.COUPON; //COUPON POLICY
                  sellableId: number;
              }
            | undefined,
    ) => {
        return await client.post<BaseResponse<IPromotion>, BaseResponse<null>>(
            "localfront/Dc_CheckAvailability",
            {
                params: {
                    requestObject: { ...payload },
                },
            },
        );
    },
    createBooking: async (payload: FeBookingPayload) => {
        return await client.post<ReservationResponse, BaseResponse<null>>(
            "localfront/BookingOrder_Addnew",
            {
                params: {
                    requestObject: {
                        ...payload,
                    },
                },
            },
        );
    },
};
