import { BaseResponse } from "@/models/management/common.interface";
import { coreApi } from "../coreApi";
import {
    BookingOrderListQueryParams,
    ReservationRs,
} from "@/models/management/booking/reservation.interface";
import {
    IOrderListRs,
    IOrderDetailRs,
} from "@/models/management/booking/order.interface";
import {
    IBookingOrderCustomerPayload,
    IBookingOrderPassengersPayload,
    IBookingOrderCancelPayload,
    IBookingOrderInvoiceInfoPayload,
} from "@/app/portal/manage-booking/modules/bookingOrder.interface";
import { ISplitBookingPayload } from "@/app/portal/manage-booking/[orderId]/split-booking/modules/splitBooking.interface";
import { IRuleAndPolicy } from "@/models/ruleAndPolicy.interface";
import {
    FormOfPaymmentQueryParams,
    IFormOfPaymentListRs,
} from "@/models/management/core/formOfPayment.interface";
import { IBookingSSRPayload } from "@/app/portal/manage-booking/[orderId]/addon-service/modules/bookingSSR.interface";

export const manageBookingAPIs = {
    getOrderList: async (
        queryParams: BookingOrderListQueryParams,
        localRuleAndPolicies?: IRuleAndPolicy[],
    ) => {
        return await coreApi.post<IOrderListRs, BaseResponse<null>>(
            "core/BookingOrder_List",
            {
                requestObject: {
                    ...queryParams?.requestObject,
                    localRuleAndPolicies,
                },
                pageCurrent: queryParams.pageCurrent,
                pageSize: queryParams.pageSize,
                localUsername: "99",
            },
        );
    },
    getOrderDetail: async (
        reservationId: number,
        localRuleAndPolicies?: IRuleAndPolicy[],
    ) => {
        return await coreApi.post<IOrderDetailRs, BaseResponse<null>>(
            "core/BookingOrder_Details",
            {
                requestObject: {
                    recId: reservationId,
                    localRuleAndPolicies,
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
    updateInvoiceInfo: async (payload?: IBookingOrderInvoiceInfoPayload) => {
        return await coreApi.post<any, BaseResponse<null>>(
            "core/BookingOrder_EditInvoiceInfo",
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
        return await coreApi.post<ReservationRs, BaseResponse<null>>(
            "core/BookingOrder_SplitInTwoOrder",
            {
                requestObject: {
                    ...payload,
                },
                localUsername: "99",
            },
        );
    },
    splitBookingAndCancel: async (payload?: ISplitBookingPayload) => {
        return await coreApi.post<ReservationRs, BaseResponse<null>>(
            "core/BookingOrder_SplitAndCancel",
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
    getFOPListByOrderId: async (queryParams?: FormOfPaymmentQueryParams) => {
        return await coreApi.post<IFormOfPaymentListRs, BaseResponse<null>>(
            "core/BookingOrder_Fop_List",
            {
                requestObject: {
                    ...queryParams?.requestObject,
                },
                pageSize: queryParams?.pageSize,
                pageCurrent: queryParams?.pageCurrent,
                localUsername: "99",
            },
        );
    },
    updateSSRByPassenger: async (payload?: IBookingSSRPayload) => {
        return await coreApi.post<IFormOfPaymentListRs, BaseResponse<null>>(
            "core/BookingOrder_EditBookingDetailsSSR",
            {
                requestObject: {
                    ...payload,
                },
                localUsername: "99",
            },
        );
    },
};
