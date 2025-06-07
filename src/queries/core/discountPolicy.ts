import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";
import { discountAPIs } from "@/services/management/cores/discount";
import { DisCountQueryParams } from "@/models/management/core/discountPolicy.interface";

export const useGetDiscountPolicyListCoreQuery = ({
  enabled = false,
  queryParams,
}: {
  enabled: boolean;
  queryParams: DisCountQueryParams;
}) => {
  return useQuery({
    queryKey: [queryCore.GET_DISCOUNT_POLICY_LIST, queryParams],
    queryFn: () => discountAPIs.getList(queryParams),
    select: (data) => {
      return {
        list: data.result,
        pageSize: data.pageSize,
        pageCurrent: data.pageCurrent,
        totalItems: data.totalItems,
      };
    },
    enabled: enabled,
  });
};
