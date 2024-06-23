"use server";
import { serverRequest } from "@/services/serverApi";
import { LangCode } from "@/models/management/cms/language.interface";
import { IPageContentDetailPerLangRs } from "@/models/management/cms/pageContent.interface";
import { BaseResponse } from "@/models/common.interface";

export const getPageContentDetail = async (payload?: {
    lang?: LangCode;
    slug?: string;
}) => {
    return await serverRequest.post<
        IPageContentDetailPerLangRs,
        BaseResponse<null>
    >("local/getCms_page_frontend", {
        next: { tags: ["pageContent"] },
        params: {
            requestObject: {
                lang: payload?.lang,
                slug: payload?.slug,
            },
        },
    });
};
