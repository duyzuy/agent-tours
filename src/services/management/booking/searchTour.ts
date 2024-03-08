import { BaseResponse } from "@/models/management/common.interface";
import { coreApi } from "../coreApi";
import { BookingInformationPayload } from "@/models/management/booking/bookingPayload.interface";
import { SearchBookingFormData } from "@/app/portal/booking/modules/searchBooking.interface";
import { IProductListRs } from "@/models/management/booking/productItem.interface";
import { ReservationRs } from "@/models/management/booking/reservation.interface";

export const bookingAPIs = {
    search: async (payload: SearchBookingFormData) => {
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
    create: async (payload?: BookingInformationPayload) => {
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
