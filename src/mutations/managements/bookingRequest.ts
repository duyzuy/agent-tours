import { bookingRequestAPIs } from "@/services/management/booking/bookingRequest";
import { useCustomMutation } from "../useCustomMutation";
import {
  BookingRequestPayload,
  BookingRequestUpdateStatusPayload,
} from "@/models/management/bookingRequest/bookingRequest.interface";

export const useCreateBookingRequestMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: BookingRequestPayload) => bookingRequestAPIs.create(payload),
  });
};

export const useUpdateBookingRequestMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: BookingRequestPayload) => bookingRequestAPIs.update(payload),
  });
};

export const useUpdateStatusBookingRequestMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: BookingRequestUpdateStatusPayload) => bookingRequestAPIs.updateStatus(payload),
  });
};
