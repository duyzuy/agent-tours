import { bookingAPIs } from "@/services/management/booking/searchTour";
import { IBookingTourPayload } from "@/app/(management)/portal/booking/modules/bookingInformation.interface";
import { ISearchBookingPayload } from "@/app/(management)/portal/booking/modules/searchBooking.interface";
import { IProductListRs } from "@/models/management/booking/productItem.interface";
import { ReservationRs } from "@/models/management/booking/reservation.interface";
import { manageBookingAPIs } from "@/services/management/booking/manageBooking";
import { formOfPaymentAPIs } from "@/services/management/cores/formOfPayment";
import {
  IBookingOrderCancelPayload,
  IBookingOrderCustomerPayload,
  IBookingOrderPassengersPayload,
  IBookingOrderInvoiceInfoPayload,
} from "@/app/(management)/portal/manage-booking/modules/bookingOrder.interface";
import { ISplitBookingPayload } from "@/app/(management)/portal/manage-booking/[orderId]/split-booking/modules/splitBooking.interface";
import { IFormOfPaymentPayload } from "@/models/management/core/formOfPayment.interface";
import { IEditOrderSSRPayload } from "@/app/(management)/portal/manage-booking/[orderId]/modules/manageBooking.interface";
import { IOrderDetailRs } from "@/models/management/booking/order.interface";
import { useCustomMutation } from "../useCustomMutation";
import { RoomingPayload } from "@/models/management/booking/rooming.interface";
//create folder in public/uploads folder.

export const useSearchBookingMutation = () => {
  return useCustomMutation<IProductListRs, ISearchBookingPayload>({
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
  return useCustomMutation<any, IBookingOrderCustomerPayload>({
    mutationFn: (payload) => manageBookingAPIs.updateCustomer(payload),
  });
};
export const useUpdatePassengersInformationMutation = () => {
  return useCustomMutation<any, IBookingOrderPassengersPayload>({
    mutationFn: (payload) => manageBookingAPIs.updatePassengers(payload),
  });
};

export const useCancelBookingOrderMutation = () => {
  return useCustomMutation<any, IBookingOrderCancelPayload>({
    mutationFn: (payload) => manageBookingAPIs.cancelBookingOrder(payload),
  });
};

export const useSplitBookingInTwoOrderMutation = () => {
  return useCustomMutation<ReservationRs, ISplitBookingPayload>({
    mutationFn: (payload) => manageBookingAPIs.splitBooking(payload),
  });
};

export const useSplitBookingToOnceOrderMutation = () => {
  return useCustomMutation<ReservationRs, ISplitBookingPayload>({
    mutationFn: (payload) => manageBookingAPIs.splitBookingAndCancel(payload),
  });
};
export const useUpdateBookingOrderInvoiceInfoMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: IBookingOrderInvoiceInfoPayload) => manageBookingAPIs.updateInvoiceInfo(payload),
  });
};

export const useCreateFormOfPaymentMutation = () => {
  return useCustomMutation<any, IFormOfPaymentPayload>({
    mutationFn: (payload) => formOfPaymentAPIs.createFormOfPayment(payload),
  });
};

export const useApprovalFormOfPaymentMutation = () => {
  return useCustomMutation({
    mutationFn: (recId: number) => formOfPaymentAPIs.approvalFOP(recId),
  });
};

export const useDeleteFormOfPaymentMutation = () => {
  return useCustomMutation<any, number>({
    mutationFn: (recId) => formOfPaymentAPIs.delete(recId),
  });
};

export const useUpdateSSRByPassengerMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: IEditOrderSSRPayload) => manageBookingAPIs.updateSSRByPassenger(payload),
  });
};

export const useExtendBookingTimeLimitMutation = () => {
  return useCustomMutation<IOrderDetailRs, { orderId: number; postponeHours: number }>({
    mutationFn: (payload) => manageBookingAPIs.extendBookingTimeLimit(payload),
  });
};
