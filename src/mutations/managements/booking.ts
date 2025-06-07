import { bookingAPIs } from "@/services/management/booking/searchTour";
import { IBookingTourPayload } from "@/app/(management)/portal/booking/modules/bookingInformation.interface";
import { ReservationRs } from "@/models/management/booking/reservation.interface";
import { manageBookingAPIs } from "@/services/management/booking/manageBooking";
import { IBookingOrderInvoiceInfoPayload } from "@/app/(management)/portal/manage-booking/modules/bookingOrder.interface";
import { useCustomMutation } from "../useCustomMutation";
import {
  AddNewSSRByPaxPayload,
  AddNewSSRNoPaxPayload,
  DeleteSSRPayload,
} from "@/models/management/booking/order.interface";
import { SearchProductPayload } from "@/models/management/booking/searchProduct.interface";

export const useSearchBookingMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: SearchProductPayload) => bookingAPIs.search(payload),
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
