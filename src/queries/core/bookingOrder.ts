import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";

import { manageBookingAPIs } from "@/services/management/booking/manageBooking";
import { BookingOrderListQueryParams } from "@/models/management/booking/reservation.interface";

export const useGetBookingOrderListCoreQuery = ({
    enabled = false,
    queryParams,
}: {
    enabled: boolean;
    queryParams: BookingOrderListQueryParams;
}) => {
    return useQuery({
        queryKey: [queryCore.GET_BOOKING_ORDER_LIST],
        queryFn: () => manageBookingAPIs.getOrderList(queryParams),
        select: (data) => data.result,
        enabled: enabled,
    });
};

export const useGetBookingDetailCoreQuery = ({
    enabled = true,
    reservationId,
}: {
    enabled: boolean;
    reservationId: number;
}) => {
    return useQuery({
        queryKey: [
            queryCore.GET_BOOKING_ORDER_DETAIL,
            {
                recId: Number(reservationId),
            },
        ],
        queryFn: () => manageBookingAPIs.getOrderDetail(reservationId),
        select: (data) => data.result,
        enabled: enabled,
    });
};
