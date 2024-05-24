import { bookingAPIs } from "@/services/management/booking/searchTour";
import { BaseResponse } from "@/models/management/common.interface";
import { useMutation } from "@tanstack/react-query";
import { IBookingTourPayload } from "@/app/portal/booking/modules/bookingInformation.interface";
import { ISearchBookingPayload } from "@/app/portal/booking/modules/searchBooking.interface";
import { IProductListRs } from "@/models/management/booking/productItem.interface";
import { ReservationRs } from "@/models/management/booking/reservation.interface";
import { manageBookingAPIs } from "@/services/management/booking/manageBooking";
import { formOfPaymentAPIs } from "@/services/management/cores/formOfPayment";
import {
    IBookingOrderCancelPayload,
    IBookingOrderCustomerPayload,
    IBookingOrderPassengersPayload,
    IBookingOrderInvoiceInfoPayload,
} from "@/app/portal/manage-booking/modules/bookingOrder.interface";
import { ISplitBookingPayload } from "@/app/portal/manage-booking/[orderId]/split-booking/modules/splitBooking.interface";
import { IFormOfPaymentPayload } from "@/models/management/core/formOfPayment.interface";
import { IBookingSSRPayload } from "@/app/portal/manage-booking/[orderId]/addon-service/modules/bookingSSR.interface";
import {
    IOrderDetail,
    IOrderDetailRs,
} from "@/models/management/booking/order.interface";

//create folder in public/uploads folder.

export const useSearchBookingMutation = () => {
    return useMutation<
        IProductListRs,
        BaseResponse<null>,
        ISearchBookingPayload
    >({
        mutationFn: (payload) => bookingAPIs.search(payload),
    });
};

export const useCreateBookingMutation = () => {
    return useMutation<ReservationRs, BaseResponse<null>, IBookingTourPayload>({
        mutationFn: (payload) => bookingAPIs.create(payload),
    });
};

export const useGetBookingTourServicesMutation = () => {
    return useMutation<any, BaseResponse<null>, number>({
        mutationFn: (sellableId) => bookingAPIs.getServices(sellableId),
    });
};

/**
 * manage booking APIS
 */
export const useUpdateCustomerInformationMutation = () => {
    return useMutation<any, BaseResponse<null>, IBookingOrderCustomerPayload>({
        mutationFn: (payload) => manageBookingAPIs.updateCustomer(payload),
    });
};
export const useUpdatePassengersInformationMutation = () => {
    return useMutation<any, BaseResponse<null>, IBookingOrderPassengersPayload>(
        {
            mutationFn: (payload) =>
                manageBookingAPIs.updatePassengers(payload),
        },
    );
};

export const useCancelBookingOrderMutation = () => {
    return useMutation<any, BaseResponse<null>, IBookingOrderCancelPayload>({
        mutationFn: (payload) => manageBookingAPIs.cancelBookingOrder(payload),
    });
};

export const useSplitBookingInTwoOrderMutation = () => {
    return useMutation<ReservationRs, BaseResponse<null>, ISplitBookingPayload>(
        {
            mutationFn: (payload) => manageBookingAPIs.splitBooking(payload),
        },
    );
};

export const useSplitBookingToOnceOrderMutation = () => {
    return useMutation<ReservationRs, BaseResponse<null>, ISplitBookingPayload>(
        {
            mutationFn: (payload) =>
                manageBookingAPIs.splitBookingAndCancel(payload),
        },
    );
};
export const useUpdateBookingOrderInvoiceInfoMutation = () => {
    return useMutation({
        mutationFn: (payload: IBookingOrderInvoiceInfoPayload) =>
            manageBookingAPIs.updateInvoiceInfo(payload),
    });
};

export const useCreateFormOfPaymentMutation = () => {
    return useMutation<any, BaseResponse<null>, IFormOfPaymentPayload>({
        mutationFn: (payload) => formOfPaymentAPIs.createFormOfPayment(payload),
    });
};

export const useApprovalFormOfPaymentMutation = () => {
    return useMutation<any, BaseResponse<null>, number>({
        mutationFn: (recId) => formOfPaymentAPIs.approvalFOP(recId),
    });
};

export const useDeleteFormOfPaymentMutation = () => {
    return useMutation<any, BaseResponse<null>, number>({
        mutationFn: (recId) => formOfPaymentAPIs.delete(recId),
    });
};

export const useUpdateSSRByPassengerMutation = () => {
    return useMutation<any, BaseResponse<null>, IBookingSSRPayload>({
        mutationFn: (payload) =>
            manageBookingAPIs.updateSSRByPassenger(payload),
    });
};

export const useExtendBookingTimeLimitMutation = () => {
    return useMutation<
        IOrderDetailRs,
        BaseResponse<null>,
        { orderId: number; postponeHours: number }
    >({
        mutationFn: (payload) =>
            manageBookingAPIs.extendBookingTimeLimit(payload),
    });
};
