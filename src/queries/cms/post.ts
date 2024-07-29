import { useQuery } from "@tanstack/react-query";
import { queryCMS } from "../var";
import { postAPIs } from "@/services/management/cms/post";
import { PostQueryParams } from "@/models/management/post.interface";

export const useGetPostListLangQuery = (options?: { queryParams: PostQueryParams }) => {
  const { queryParams } = options || {};
  return useQuery({
    queryKey: [
      queryCMS.GET_POST_CONTENT_LIST,
      {
        pageSize: queryParams?.pageSize,
        pageCurrent: queryParams?.pageCurrent,
        requestObject: queryParams?.requestObject,
      },
    ],
    queryFn: () => postAPIs.getListMinimal(queryParams),
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

export const useGetPostDetailQuery = ({ id, originId }: { id?: number; originId?: number }) => {
  return useQuery({
    queryKey: [
      queryCMS.GET_POST_CONTENT_DETAIL,
      {
        originId,
      },
    ],
    queryFn: () => postAPIs.getDetail({ id, originId }),
    select: (data) => {
      console.log(data);
      return data.result;
    },
    retry: false,
  });
};
