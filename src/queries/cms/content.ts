import { useQuery } from "@tanstack/react-query";
import { queryCMS } from "../var";

import { pageContentAPIs } from "@/services/management/cms/pageContent";
import { getAgToken } from "@/utils/common";
import {
  IPageContentDetailRs,
  PageContentMinimalQueryParams,
  PageContentQueryParams,
} from "@/models/management/cms/pageContent.interface";

export const useGetPageContentListQuery = (queryParams: PageContentQueryParams, enabled = true) => {
  return useQuery({
    queryKey: [queryCMS.GET_PAGE_LIST, { ...queryParams }],
    queryFn: () => pageContentAPIs.getList(queryParams),
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

export const useGetPageContentMinimalListQuery = (queryParams: PageContentMinimalQueryParams, enabled = true) => {
  return useQuery({
    queryKey: [queryCMS.GET_PAGE_LIST, { ...queryParams }],
    queryFn: () => pageContentAPIs.getListMinimal(queryParams),
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

export const useGetPageContentListParentByLangQuery = (queryParams?: PageContentQueryParams) => {
  return useQuery({
    queryKey: [queryCMS.GET_PAGE_LIST, { ...queryParams }],
    queryFn: () => pageContentAPIs.getParentListByLang(queryParams),
    select: (data) => {
      return {
        list: data.result,
        pageSize: data.pageSize,
        pageCurrent: data.pageCurrent,
        totalItems: data.totalItems,
      };
    },
    enabled: Boolean(getAgToken()),
  });
};

export const useGetPageContentDetailQuery = (payload: { id: number } | { originId: number }) => {
  return useQuery({
    queryKey: [queryCMS.GET_PAGE_DETAIL, payload],
    queryFn: () => pageContentAPIs.getDetail(payload),
    select: (data) => {
      return data.result;
    },
    enabled: Boolean(getAgToken()),
  });
};
