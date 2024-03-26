import { BaseResponse } from "@/models/management/common.interface";
import { coreApi } from "../coreApi";
import { IBookingTourPayload } from "@/app/portal/booking/modules/bookingInformation.interface";

import { ISearchBookingPayload } from "@/app/portal/booking/modules/searchBooking.interface";
import { IProductListRs } from "@/models/management/booking/productItem.interface";
import { ReservationRs } from "@/models/management/booking/reservation.interface";
import { IServicesRs } from "@/models/management/booking/service.interface";

export const bookingAPIs = {
    search: async (payload: ISearchBookingPayload) => {
        return await coreApi.post<IProductListRs, BaseResponse<null>>(
            "core/BookingOrder_Search",
            {
                requestObject: {
                    ...payload,
                },
                localUsername: "99",
            },
        );
    },
    getServices: async (sellableId?: number) => {
        return await coreApi.post<IServicesRs, BaseResponse<null>>(
            "core/BookingOrder_Search_GetSellableSsr",
            {
                requestObject: {
                    sellableId: sellableId,
                },
                localUsername: "99",
            },
        );
    },
    create: async (payload?: IBookingTourPayload) => {
        return await coreApi.post<ReservationRs, BaseResponse<null>>(
            "core/BookingOrder_Addnew",
            {
                requestObject: {
                    ...payload,
                },
                localUsername: "99",
            },
        );
    },
};
