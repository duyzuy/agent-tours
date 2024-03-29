import { bookingAPIs } from "@/services/management/booking/searchTour";
import { BaseResponse } from "@/models/management/common.interface";
import { useMutation } from "@tanstack/react-query";
import { IBookingTourPayload } from "@/app/portal/booking/modules/bookingInformation.interface";
import { ISearchBookingPayload } from "@/app/portal/booking/modules/searchBooking.interface";
import { IProductListRs } from "@/models/management/booking/productItem.interface";
import {
    IReservation,
    ReservationRs,
} from "@/models/management/booking/reservation.interface";
import { manageBookingAPIs } from "@/services/management/booking/manageBooking";
import { formOfPaymentAPIs } from "@/services/management/cores/formOfPayment";
import {
    IBookingOrderCancelPayload,
    IBookingOrderCustomerPayload,
    IBookingOrderPassengersPayload,
} from "@/app/portal/manage-booking/modules/bookingOrder.interface";
import { ISplitBookingPayload } from "@/app/portal/manage-booking/[orderId]/split-booking/modules/splitBooking.interface";
import { IFormOfPaymentPayload } from "@/app/portal/manage-booking/[orderId]/modules/formOfPayment.interface";

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

export const useSplitBookingMutation = () => {
    return useMutation<ReservationRs, BaseResponse<null>, ISplitBookingPayload>(
        {
            mutationFn: (payload) => manageBookingAPIs.splitBooking(payload),
        },
    );
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
