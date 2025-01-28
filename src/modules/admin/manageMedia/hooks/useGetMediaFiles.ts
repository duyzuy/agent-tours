import { useTQuery } from "@/lib/reactQueryHooks";
import { MEDIA_QUERY } from "@/constants/query-var.constant";
import { MediaFilesQueryParams } from "@/models/management/media.interface";
import { localMediaAPIs } from "@/services/management/localMedia";

export const useGetMediaFiles = (qeryParams: MediaFilesQueryParams) => {
  return useTQuery({
    queryKey: [
      MEDIA_QUERY.GET_MEDIA_FILES,
      {
        folderId: qeryParams.requestObject.mediaInFolderRecid,
        mediaType: qeryParams.requestObject.mediaType,
        pageCurrent: qeryParams.pageCurrent,
        pageSize: qeryParams.pageSize,
        orderBy: {
          direction: qeryParams.orderBy?.direction,
          sortColumn: qeryParams.orderBy?.sortColumn,
        },
      },
    ],
    queryFn: () => localMediaAPIs.getFiles(qeryParams),
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
