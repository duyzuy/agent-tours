import { BaseResponse } from "@/models/management/common.interface";
import { coreApi } from "../coreApi";
import { ReservationListRs } from "@/models/management/booking/reservation.interface";
import { BookingOrderListQueryParams } from "@/models/management/booking/reservation.interface";
import { IBookingOrderDetailRs } from "@/models/management/booking/order.interface";
export const manageBookingAPIs = {
    getOrderList: async (queryParams: BookingOrderListQueryParams) => {
        return await coreApi.post<ReservationListRs, BaseResponse<null>>(
            "core/BookingOrder_List",
            {
                requestObject: {
                    ...queryParams?.requestObject,
                },
                pageCurrent: queryParams.pageCurrent,
                pageSize: queryParams.pageSize,
                localUsername: "99",
            },
        );
    },
    getOrderDetail: async (reservationId: number) => {
        return await coreApi.post<IBookingOrderDetailRs, BaseResponse<null>>(
            "core/BookingOrder_Details",
            {
                requestObject: {
                    recId: reservationId,
                },
                localUsername: "99",
            },
        );
    },
};
