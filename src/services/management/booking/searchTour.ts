import { coreApi } from "../coreApi";
import { IBookingTourPayload } from "@/app/(management)/portal/booking/modules/bookingInformation.interface";
import { ReservationRs } from "@/models/management/booking/reservation.interface";
import { ServiceListResponse } from "@/models/management/booking/service.interface";
import { ProductListResponse, SearchProductPayload } from "@/models/management/booking/searchProduct.interface";

export const bookingAPIs = {
  search: async <T extends SearchProductPayload>(payload: T) => {
    return await coreApi.post<ProductListResponse<T>>("core/BookingOrder_Search", {
      requestObject: {
        ...payload,
      },
    });
  },
  getServices: async (sellableId?: number) => {
    return await coreApi.post<ServiceListResponse>("core/BookingOrder_Search_GetSellableSsr", {
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
