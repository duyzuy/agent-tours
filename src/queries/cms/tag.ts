import { useQuery } from "@tanstack/react-query";
import { queryCMS } from "../var";
import { tagAPIs } from "@/services/management/cms/tag";
import { TagQueryParams } from "@/models/management/tag.interface";

export const useGetTagListLangQuery = (options?: { queryParams: TagQueryParams }) => {
  const { queryParams } = options || {};
  return useQuery({
    queryKey: [
      queryCMS.GET_TAG_LIST,
      {
        pageSize: queryParams?.pageSize,
        pageCurrent: queryParams?.pageCurrent,
        requestObject: queryParams?.requestObject,
      },
    ],
    queryFn: () => tagAPIs.getList(queryParams),
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

export const useGetTagDetailQuery = ({ id, originId }: { id?: number; originId?: number }) => {
  return useQuery({
    queryKey: [queryCMS.GET_TAG_DETAIL, { originId }],
    queryFn: () => tagAPIs.getDetail({ id, originId }),
    select: (data) => {
      return data.result;
    },
  });
};
