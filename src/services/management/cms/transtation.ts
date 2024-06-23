import { getAgToken } from "@/utils/common";
import { client } from "@/services/api";
import { LangCode } from "@/models/management/cms/language.interface";
import { BaseResponse } from "@/models/common.interface";
import { ITranslationRs } from "@/models/management/cms/translations.interface";
import { ITranslationPayload } from "@/models/management/cms/translations.interface";
export const translationAPIs = {
    getList: async () => {
        return await client.post<ITranslationRs, BaseResponse<null>>(
            "local/getCms_translation_frontend",
            {
                headers: {
                    Authorization: `Bearer ${encodeURIComponent(
                        getAgToken() || "",
                    )}`,
                },
            },
        );
    },
    getAllByLang: async (lang: LangCode) => {
        return await client.post<any, BaseResponse<null>>(
            "local/getCms_translation_frontend_Bylang",
            {
                headers: {
                    Authorization: `Bearer ${encodeURIComponent(
                        getAgToken() || "",
                    )}`,
                },
                params: {
                    requestObject: {
                        lang,
                    },
                },
            },
        );
    },
    create: async (payload: ITranslationPayload) => {
        return await client.post<any, BaseResponse<null>>(
            "local/Cms_translation_frontend_Addnew",
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
    update: async (payload: ITranslationPayload) => {
        return await client.post<any, BaseResponse<null>>(
            "local/Cms_translation_frontend_Edit",
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
