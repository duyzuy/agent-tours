import { getAgToken } from "@/utils/common";
import { client } from "@/services/api";
import { BaseResponse } from "@/models/management/common.interface";
import { ITranslationPayload } from "@/models/management/cms/translations.interface";
import {
    IPageContentPayload,
    IPageContentRs,
} from "@/models/management/cms/pageContent.interface";
export const pageContentAPIs = {
    create: async (payload: IPageContentPayload) => {
        return await client.post<IPageContentRs, BaseResponse<null>>(
            "local/Cms_page_Addnew",
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
