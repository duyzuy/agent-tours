import { bookingAPIs } from "@/services/management/booking/searchTour";
import { IBookingTourPayload } from "@/app/(management)/portal/booking/modules/bookingInformation.interface";
import { SearchBookingPayload } from "@/app/(management)/portal/booking/modules/searchBooking.interface";
import { ProductTouListResponse } from "@/models/management/booking/product.interface";
import { ReservationRs } from "@/models/management/booking/reservation.interface";
import { manageBookingAPIs } from "@/services/management/booking/manageBooking";
import { formOfPaymentAPIs } from "@/services/management/cores/formOfPayment";
import {
  IBookingOrderCancelPayload,
  IBookingOrderCustomerPayload,
  IBookingOrderInvoiceInfoPayload,
  IOrderPassengerEditPayload,
} from "@/app/(management)/portal/manage-booking/modules/bookingOrder.interface";

import { ISplitBookingPayload } from "@/app/(management)/portal/manage-booking/[orderId]/split-booking/modules/splitBooking.interface";
import { FormOfPaymentPayload } from "@/models/management/core/formOfPayment.interface";

import { IOrderDetailRs } from "@/models/management/booking/order.interface";
import { useCustomMutation } from "../useCustomMutation";
import { RoomingPayload } from "@/models/management/booking/rooming.interface";
import {
  AddNewSSRByPaxPayload,
  AddNewSSRNoPaxPayload,
  DeleteSSRPayload,
} from "@/models/management/booking/order.interface";
//create folder in public/uploads folder.

export const useSearchBookingMutation = () => {
  return useCustomMutation<ProductTouListResponse, SearchBookingPayload>({
    mutationFn: (payload) => bookingAPIs.search(payload),
  });
};

export const useCreateBookingMutation = () => {
  return useCustomMutation<ReservationRs, IBookingTourPayload>({
    mutationFn: (payload) => bookingAPIs.create(payload),
  });
};

export const useGetBookingTourServicesMutation = () => {
  return useCustomMutation<any, number>({
    mutationFn: (sellableId) => bookingAPIs.getServices(sellableId),
  });
};

/**
 * manage booking APIS
 */
export const useUpdateCustomerInformationMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: IBookingOrderCustomerPayload) => manageBookingAPIs.updateCustomer(payload),
  });
};
export const useUpdatePassengersInformationMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: IOrderPassengerEditPayload) => manageBookingAPIs.updatePassengers(payload),
  });
};

export const useCancelBookingOrderMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: IBookingOrderCancelPayload) => manageBookingAPIs.cancelBookingOrder(payload),
  });
};

export const useSplitBookingInTwoOrderMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: ISplitBookingPayload) => manageBookingAPIs.splitBooking(payload),
  });
};

export const useSplitBookingToOnceOrderMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: ISplitBookingPayload) => manageBookingAPIs.splitBookingAndCancel(payload),
  });
};
export const useUpdateBookingOrderInvoiceInfoMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: IBookingOrderInvoiceInfoPayload) => manageBookingAPIs.updateInvoiceInfo(payload),
  });
};

export const useCreateCommentMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: { orderId: number; comment: string }) => manageBookingAPIs.addComment(payload),
  });
};

export const useCreateFormOfPaymentMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: FormOfPaymentPayload) => formOfPaymentAPIs.createFormOfPayment(payload),
  });
};

export const useApprovalFormOfPaymentMutation = () => {
  return useCustomMutation({
    mutationFn: (recId: number) => formOfPaymentAPIs.approvalFOP(recId),
  });
};

export const useDeleteFormOfPaymentMutation = () => {
  return useCustomMutation({
    mutationFn: (recId: number) => formOfPaymentAPIs.delete(recId),
  });
};

// export const useUpdateSSRByPassengerMutation = () => {
//   return useCustomMutation({
//     mutationFn: (payload: IEditOrderSSRPayload) => manageBookingAPIs.updateSSRByPassenger(payload),
//   });
// };
export const useAddSSRByPassengerMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: AddNewSSRByPaxPayload) => manageBookingAPIs.addNewSSRByPax(payload),
  });
};
export const useAddSSRNoPassengerMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: AddNewSSRNoPaxPayload) => manageBookingAPIs.addNewSSRNoPax(payload),
  });
};

export const useDeleteSSRMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: DeleteSSRPayload) => manageBookingAPIs.deleteSSR(payload),
  });
};

export const useExtendBookingTimeLimitMutation = () => {
  return useCustomMutation<IOrderDetailRs, { orderId: number; postponeHours: number }>({
    mutationFn: (payload) => manageBookingAPIs.extendBookingTimeLimit(payload),
  });
};
