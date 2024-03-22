import { BaseResponse } from "@/models/management/common.interface";
import { coreApi } from "../coreApi";
import { BookingOrderListQueryParams } from "@/models/management/booking/reservation.interface";
import {
    IOrderListRs,
    IOrderDetailRs,
} from "@/models/management/booking/order.interface";
import {
    IBookingOrderCustomerPayload,
    IBookingOrderPassengersPayload,
    IBookingOrderCancelPayload,
} from "@/app/portal/manage-booking/modules/bookingOrder.interface";
import { ISplitBookingPayload } from "@/app/portal/manage-booking/[orderId]/split-booking/modules/splitBooking.interface";
export const manageBookingAPIs = {
    getOrderList: async (queryParams: BookingOrderListQueryParams) => {
        return await coreApi.post<IOrderListRs, BaseResponse<null>>(
            "core/BookingOrder_List",
            {
                requestObject: {
                    ...queryParams?.requestObject,
                },
                pageCurrent: queryParams.pageCurrent,
                pageSize: queryParams.pageSize,
                localUsername: "99",
            },
        );
    },
    getOrderDetail: async (reservationId: number) => {
        return await coreApi.post<IOrderDetailRs, BaseResponse<null>>(
            "core/BookingOrder_Details",
            {
                requestObject: {
                    recId: reservationId,
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
    splitBooking: async (payload?: ISplitBookingPayload) => {
        return await coreApi.post<any, BaseResponse<null>>(
            "core/BookingOrder_Split",
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
