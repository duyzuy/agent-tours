import { useQuery } from "@tanstack/react-query";
import { queryCMS } from "../var";
import { miscDocumentAPIs } from "@/services/management/cms/miscDocument";

export const useGetMiscDocumentListQuery = (options?: { enabled?: boolean }) => {
  const { enabled = true } = options || {};
  return useQuery({
    queryKey: [queryCMS.GET_MISC_DOCUMENT_LIST],
    queryFn: () => miscDocumentAPIs.getList(),
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
