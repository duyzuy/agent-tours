import { membersAPIs } from "@/services/management/members";

import { useTQuery } from "@/lib/reactQueryHooks";
import { MEMBER_QUERY } from "@/constants/query-var.constant";
import { MemberQueryParams } from "@/models/management/member.interface";

export const useGetMemberList = ({ queryParams, enabled }: { queryParams: MemberQueryParams; enabled?: boolean }) => {
  return useTQuery({
    queryKey: [
      MEMBER_QUERY.GET_MEMBER_LIST,
      {
        pageCurrent: queryParams.pageCurrent,
        pageSize: queryParams.pageSize,
        requestObject: queryParams.requestObject,
      },
    ],
    queryFn: () => membersAPIs.getList(queryParams),
    select: (data) => ({
      list: data.result,
      pageCurrent: data.pageCurrent,
      pageSize: data.pageSize,
      totalItems: data.totalItems,
    }),
    enabled,
  });
};
