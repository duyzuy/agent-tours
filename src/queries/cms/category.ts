import { useQuery } from "@tanstack/react-query";
import { queryCMS } from "../var";
import { categoryAPIs } from "@/services/management/cms/category";
import { CategoryQueryParams } from "@/models/management/category.interface";

export const useGetCategoryListLangQuery = (options?: { queryParams: CategoryQueryParams }) => {
  const { queryParams } = options || {};
  return useQuery({
    queryKey: [
      queryCMS.GET_CATEGORY_LIST,
      {
        pageSize: queryParams?.pageSize,
        pageCurrent: queryParams?.pageCurrent,
        requestObject: queryParams?.requestObject,
      },
    ],
    queryFn: () => categoryAPIs.getListMinimal(queryParams),
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

export const useGetCategoryDetailQuery = ({ id, originId }: { id?: number; originId?: number }) => {
  return useQuery({
    queryKey: [queryCMS.GET_CATEGORY_DETAIL, { originId }],
    queryFn: () => categoryAPIs.getDetail({ id, originId }),
    select: (data) => {
      return data.result;
    },
    retry: false,
  });
};

export const useGetCategoryParentListQuery = (queryParams: CategoryQueryParams) => {
  return useQuery({
    queryKey: [queryCMS.GET_CATEGORY_PARENT_LIST, { ...queryParams }],
    queryFn: () => categoryAPIs.getParentList(queryParams),
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
