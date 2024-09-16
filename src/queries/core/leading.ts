import { useQuery } from "@tanstack/react-query";
import { queryCMS } from "../var";
import { LeadingQueryParams } from "@/models/management/leading.interface";
import { leadingAPIs } from "@/services/management/cms/leading";

export const useGetLeadingListQuery = (options?: { queryParams: LeadingQueryParams }) => {
  const { queryParams } = options || {};
  return useQuery({
    queryKey: [
      queryCMS.GET_LEADING_LIST,
      {
        pageSize: queryParams?.pageSize,
        pageCurrent: queryParams?.pageCurrent,
        requestObject: queryParams?.requestObject,
      },
    ],
    queryFn: () => leadingAPIs.getList(queryParams),
    select: (data) => {
      return {
        list: data.result,
        pageCurrent: data.pageCurrent,
        pageSize: data.pageSize,
        totalItems: data.totalItems,
      };
    },
  });
};
