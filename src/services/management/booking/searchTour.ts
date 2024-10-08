import { coreApi } from "../coreApi";
import { IBookingTourPayload } from "@/app/(management)/portal/booking/modules/bookingInformation.interface";
import { ISearchBookingPayload } from "@/app/(management)/portal/booking/modules/searchBooking.interface";
import { IProductListRs } from "@/models/management/booking/productItem.interface";
import { ReservationRs } from "@/models/management/booking/reservation.interface";
import { IServicesRs } from "@/models/management/booking/service.interface";

export const bookingAPIs = {
  search: async (payload: ISearchBookingPayload) => {
    return await coreApi.post<IProductListRs>("core/BookingOrder_Search", {
      requestObject: {
        ...payload,
      },
    });
  },
  getServices: async (sellableId?: number) => {
    return await coreApi.post<IServicesRs>("core/BookingOrder_Search_GetSellableSsr", {
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
