import { coreApi } from "../coreApi";
import { IBookingTourPayload } from "@/app/(management)/portal/booking/modules/bookingInformation.interface";
import { SearchBookingPayload } from "@/app/(management)/portal/booking/modules/searchBooking.interface";
import { ProductTouListResponse } from "@/models/management/booking/product.interface";
import { ReservationRs } from "@/models/management/booking/reservation.interface";
import { ProductServiceListResponse } from "@/models/management/booking/service.interface";

export const bookingAPIs = {
  search: async (payload: SearchBookingPayload) => {
    return await coreApi.post<ProductTouListResponse>("core/BookingOrder_Search", {
      requestObject: {
        ...payload,
      },
    });
  },
  getServices: async (sellableId?: number) => {
    return await coreApi.post<ProductServiceListResponse>("core/BookingOrder_Search_GetSellableSsr", {
      requestObject: {
        sellableId: sellableId,
      },
    });
  },
  create: async (payload?: IBookingTourPayload) => {
    return await coreApi.post<ReservationRs>("core/BookingOrder_Addnew", {
      requestObject: {
        ...payload,
      },
    });
  },
};
