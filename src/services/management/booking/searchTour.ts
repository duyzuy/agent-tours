import { BaseResponse } from "@/models/management/common.interface";
import { coreApi } from "../coreApi";
import { BookingInformationPayload } from "@/models/management/booking/bookingPayload.interface";
import { SearchBookingFormData } from "@/app/portal/booking/modules/searchBooking.interface";
import { IProductListRs } from "@/models/management/booking/productItem.interface";
import { ReservationRs } from "@/models/management/booking/reservation.interface";
import {
    IBookingOrderCancelPayload,
    IBookingOrderCustomerPayload,
    IBookingOrderPassengersPayload,
} from "@/app/portal/manage-booking/modules/bookingOrder.interface";

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

    updateCustomer: async (payload?: IBookingOrderCustomerPayload) => {
        return await coreApi.post<any, BaseResponse<null>>(
            "core/BookingOrder_EditContactInfo",
            {
                requestObject: {
                    ...payload,
                },
                localUsername: "99",
            },
        );
    },

    updatePassengers: async (payload?: IBookingOrderPassengersPayload) => {
        return await coreApi.post<any, BaseResponse<null>>(
            "core/BookingOrder_EditBookingPaxInfo",
            {
                requestObject: {
                    ...payload,
                },
                localUsername: "99",
            },
        );
    },
    cancelBookingOrder: async (payload?: IBookingOrderCancelPayload) => {
        return await coreApi.post<any, BaseResponse<null>>(
            "core/BookingOrder_Cancel",
            {
                requestObject: {
                    ...payload,
                },
                localUsername: "99",
            },
        );
    },
};
