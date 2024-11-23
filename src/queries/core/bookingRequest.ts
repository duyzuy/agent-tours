import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";

import { bookingRequestAPIs } from "@/services/management/booking/bookingRequest";
import { BookingRequestQueryParams } from "@/models/management/bookingRequest/bookingRequest.interface";

export const useGetBookingRequestListCoreQuery = (options?: {
  enabled: boolean;
  queryParams: BookingRequestQueryParams;
}) => {
  const { queryParams, enabled } = options || {};

  return useQuery({
    queryKey: [queryCore.GET_BOOKING_REQUEST_LIST, queryParams],
    queryFn: () => bookingRequestAPIs.getList(queryParams),
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

export const useGetBookingRequestDetailCoreQuery = (requestId: number) => {
  return useQuery({
    queryKey: [queryCore.GET_BOOKING_REQUEST_DETAIL, requestId],
    queryFn: () => bookingRequestAPIs.getOne(requestId),
    select: (data) => {
      return data.result;
    },
  });
};
