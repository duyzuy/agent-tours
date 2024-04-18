import { useQuery } from "@tanstack/react-query";
import { queryCMS } from "../var";

import { pageContentAPIs } from "@/services/management/cms/pageContent";
import { getAgToken } from "@/utils/common";
import {
    IPageContentDetailRs,
    PageContentQueryParams,
} from "@/models/management/cms/pageContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import { isUndefined } from "lodash";

export const useGetPageContentListQuery = (
    queryParams?: PageContentQueryParams,
) => {
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
        enabled: Boolean(getAgToken()),
    });
};

export const useGetPageContentListParentByLangQuery = (
    lang?: LangCode,
    queryParams?: PageContentQueryParams,
) => {
    return useQuery({
        queryKey: [queryCMS.GET_PAGE_LIST, lang, { ...queryParams }],
        queryFn: () => pageContentAPIs.getParentListByLang(lang, queryParams),
        select: (data) => {
            return {
                list: data.result,
                pageSize: data.pageSize,
                pageCurrent: data.pageCurrent,
                totalItems: data.totalItems,
            };
        },
        enabled: Boolean(getAgToken()) && !isUndefined(lang),
    });
};

export const useGetPageContentDetailQuery = (
    payload: { id: number } | { originId: number },
) => {
    return useQuery({
        queryKey: [queryCMS.GET_PAGE_DETAIL, payload],
        queryFn: () => pageContentAPIs.getDetail(payload),
        select: (data) => {
            return data.result;
        },
        enabled: Boolean(getAgToken()),
    });
};
