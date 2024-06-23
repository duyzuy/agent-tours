"use server";
import { serverRequest } from "@/services/serverApi";
import { LangCode } from "@/models/management/cms/language.interface";
import { BaseResponse } from "@/models/common.interface";
import { ITranslationListFeRs } from "@/models/management/cms/translations.interface";

export const getTranslationFe = async (lang?: LangCode) => {
    return await serverRequest.post<ITranslationListFeRs, BaseResponse<null>>(
        "local/getCms_translation_frontend_Bylang",
        {
            next: { tags: ["feTranslations"] },
            params: {
                requestObject: {
                    lang: lang,
                },
            },
        },
    );
};
