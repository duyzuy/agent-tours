import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";

import { manageBookingAPIs } from "@/services/management/booking/manageBooking";
import { bookingAPIs } from "@/services/management/booking/searchTour";
import { BookingOrderListQueryParams } from "@/models/management/booking/reservation.interface";
import { IRuleAndPolicy } from "@/models/ruleAndPolicy.interface";
import { FormOfPaymmentQueryParams } from "@/models/management/core/formOfPayment.interface";

export const useGetBookingOrderListCoreQuery = ({
  enabled = false,
  queryParams,
  localRuleAndPolicies,
}: {
  enabled: boolean;
  queryParams: BookingOrderListQueryParams;
  localRuleAndPolicies?: IRuleAndPolicy[];
}) => {
  return useQuery({
    queryKey: [queryCore.GET_BOOKING_ORDER_LIST, queryParams],
    queryFn: () => manageBookingAPIs.getOrderList(queryParams, localRuleAndPolicies),
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
  localRuleAndPolicies,
}: {
  enabled: boolean;
  reservationId?: number;
  localRuleAndPolicies?: IRuleAndPolicy[];
}) => {
  return useQuery({
    queryKey: [
      queryCore.GET_BOOKING_ORDER_DETAIL,
      {
        recId: Number(reservationId),
      },
    ],
    queryFn: () => manageBookingAPIs.getOrderDetail(reservationId, localRuleAndPolicies),
    select: (data) => data.result,
    enabled: enabled,
    staleTime: 5 * 60 * 1000,
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
      queryCore.GET_PRODUCT_SERVICES_LIST,
      {
        sellableId: Number(sellableId),
      },
    ],
    queryFn: () => bookingAPIs.getServices(sellableId),
    select: (data) => data.result.extraConfigs,
    enabled: enabled,
  });
};

export const useGetFormOfPaymentListByOrderIdCoreQuery = ({
  enabled = false,
  queryParams,
}: {
  enabled: boolean;
  queryParams: FormOfPaymmentQueryParams;
}) => {
  return useQuery({
    queryKey: [queryCore.GET_FORM_OF_PAYMENT_LIST, queryParams],
    queryFn: () => manageBookingAPIs.getFOPListByOrderId(queryParams),
    select: (data) => data.result,
    enabled: enabled,
  });
};
