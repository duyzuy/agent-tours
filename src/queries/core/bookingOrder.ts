import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";

import { manageBookingAPIs } from "@/services/management/booking/manageBooking";
import { bookingAPIs } from "@/services/management/booking/searchTour";
import { BookingOrderListQueryParams } from "@/models/management/booking/reservation.interface";
import { IRuleAndPolicy } from "@/models/ruleAndPolicy.interface";

export const useGetBookingOrderListCoreQuery = ({
    enabled = false,
    queryParams,
    localRuleAndPolicies,
}: {
    enabled: boolean;
    queryParams: BookingOrderListQueryParams;
    localRuleAndPolicies: IRuleAndPolicy[];
}) => {
    return useQuery({
        queryKey: [queryCore.GET_BOOKING_ORDER_LIST, queryParams],
        queryFn: () =>
            manageBookingAPIs.getOrderList(queryParams, localRuleAndPolicies),
        select: (data) => {
            return {
                list: data.result,
                pageCurrent: data.pageCurrent,
                pageSize: data.pageSize,
                totalItems: data.totalItems,
            };
        },
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

export const useGetBookingTourServicesCoreQuery = ({
    enabled = true,
    sellableId,
}: {
    enabled: boolean;
    sellableId?: number;
}) => {
    return useQuery({
        queryKey: [
            queryCore.GET_BOOKING_BOOKING_TOUR_SERVIES,
            {
                sellableId: Number(sellableId),
            },
        ],
        queryFn: () => bookingAPIs.getServices(sellableId),
        select: (data) => data.result,
        enabled: enabled,
    });
};
