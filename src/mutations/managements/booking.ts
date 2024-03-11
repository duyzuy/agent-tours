import { bookingAPIs } from "@/services/management/booking/searchTour";
import { BaseResponse } from "@/models/management/common.interface";
import { useMutation } from "@tanstack/react-query";
import { BookingInformationPayload } from "@/models/management/booking/bookingPayload.interface";
import { SearchBookingFormData } from "@/app/portal/booking/modules/searchBooking.interface";
import { IProductListRs } from "@/models/management/booking/productItem.interface";
import { ReservationRs } from "@/models/management/booking/reservation.interface";
import { IBookingOrderCustomerAndPassengerPayload } from "@/app/portal/manage-booking/modules/bookingOrder.interface";

//create folder in public/uploads folder.

export const useSearchBookingMutation = () => {
    return useMutation<
        IProductListRs,
        BaseResponse<null>,
        SearchBookingFormData
    >({
        mutationFn: (payload) => bookingAPIs.search(payload),
    });
};

export const useCreateBookingMutation = () => {
    return useMutation<
        ReservationRs,
        BaseResponse<null>,
        BookingInformationPayload | undefined
    >({
        mutationFn: (payload) => bookingAPIs.create(payload),
    });
};

export const useUpdatePassengerAndCustomerInformationMutation = () => {
    return useMutation<
        any,
        BaseResponse<null>,
        IBookingOrderCustomerAndPassengerPayload
    >({
        mutationFn: (payload) =>
            bookingAPIs.updateCustomerAndPassenger(payload),
    });
};
