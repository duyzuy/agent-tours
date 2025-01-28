import { useTQuery } from "@/lib/reactQueryHooks";
import { MEDIA_QUERY } from "@/constants/query-var.constant";
import { MediaFolderQueryParams } from "@/models/management/media.interface";
import { localMediaAPIs } from "@/services/management/localMedia";

export const useGetMediaFolders = ({
  queryParams,
  enabled,
}: {
  queryParams: MediaFolderQueryParams;
  enabled?: boolean;
}) => {
  return useTQuery({
    queryKey: [MEDIA_QUERY.GET_MEDIA_FOLDERS, { pageCurrent: queryParams.pageCurrent, pageSize: queryParams.pageSize }],
    queryFn: () => localMediaAPIs.getFolders(queryParams),
    select: (data) => {
      return {
        list: data.result,
        pageCurrent: data.pageCurrent,
        pageSize: data.pageSize,
        totalItems: data.totalItems,
      };
    },
    enabled,
  });
};
