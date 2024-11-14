import { useQuery } from "@tanstack/react-query";
import { queryCMS } from "../var";
import { miscDepartAPIs } from "@/services/management/cms/miscDepart";

export const useGetMiscDepartLocationsQuery = (options?: { enabled?: boolean }) => {
  const { enabled = true } = options || {};
  return useQuery({
    queryKey: [queryCMS.GET_MISC_DEPART_LOCATION_LIST],
    queryFn: () => miscDepartAPIs.getList(),
    select: (data) => {
      return {
        list: data.result,
        pageSize: data.pageSize,
        pageCurrent: data.pageCurrent,
        totalItems: data.totalItems,
      };
    },
    enabled,
  });
};
