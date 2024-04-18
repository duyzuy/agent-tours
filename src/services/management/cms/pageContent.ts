import { getAgToken } from "@/utils/common";
import { client } from "@/services/api";
import { BaseResponse } from "@/models/management/common.interface";
import {
    IPageContentPayload,
    IPageContentDetailRs,
    IPageContentListRs,
    IPageContentDetailPerLangRs,
    PageContentQueryParams,
} from "@/models/management/cms/pageContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";
export const pageContentAPIs = {
    create: async (payload: IPageContentPayload) => {
        return await client.post<
            IPageContentDetailPerLangRs,
            BaseResponse<null>
        >("local/Cms_page_Addnew", {
            headers: {
                Authorization: `Bearer ${encodeURIComponent(
                    getAgToken() || "",
                )}`,
            },
            params: {
                requestObject: {
                    ...payload,
                },
            },
        });
    },
    update: async (payload: IPageContentPayload) => {
        return await client.post<
            IPageContentDetailPerLangRs,
            BaseResponse<null>
        >("local/Cms_page_Edit", {
            headers: {
                Authorization: `Bearer ${encodeURIComponent(
                    getAgToken() || "",
                )}`,
            },
            params: {
                requestObject: {
                    ...payload,
                },
            },
        });
    },
    getList: async (queryParams?: PageContentQueryParams) => {
        return await client.post<IPageContentListRs, BaseResponse<null>>(
            "local/Cms_page_List",
            {
                headers: {
                    Authorization: `Bearer ${encodeURIComponent(
                        getAgToken() || "",
                    )}`,
                },
                params: {
                    requestObject: {},
                    pageCurrent: queryParams?.pageCurrent,
                    pageSize: queryParams?.pageSize,
                },
            },
        );
    },
    getParentListByLang: async ({
        lang,
        excludes,
        queryParams,
    }: {
        lang?: LangCode;
        excludes?: number[];
        queryParams?: PageContentQueryParams;
    }) => {
        return await client.post<IPageContentListRs, BaseResponse<null>>(
            "local/Cms_page_ListOnlyParent",
            {
                headers: {
                    Authorization: `Bearer ${encodeURIComponent(
                        getAgToken() || "",
                    )}`,
                },
                params: {
                    requestObject: { lang, excludes },
                    pageCurrent: queryParams?.pageCurrent,
                    pageSize: queryParams?.pageSize,
                },
            },
        );
    },
    getDetail: async (payload: { id: number } | { originId: number }) => {
        return await client.post<IPageContentDetailRs, BaseResponse<null>>(
            "local/getCms_page_byId",
            {
                headers: {
                    Authorization: `Bearer ${encodeURIComponent(
                        getAgToken() || "",
                    )}`,
                },
                params: {
                    requestObject: {
                        ...payload,
                    },
                },
            },
        );
    },
};
