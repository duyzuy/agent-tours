import { client } from "@/services/api";
import { LangCode } from "@/models/management/cms/language.interface";
import {
  TranslationListResponse,
  ITranslationRs,
  TranslationQueryParams,
} from "@/models/management/cms/translations.interface";
import { TranslationPayload } from "@/models/management/cms/translations.interface";
export const translationAPIs = {
  getList: async (queryParams?: TranslationQueryParams) => {
    return await client.post<TranslationListResponse>("local/getCms_translation_frontend", {
      isAuth: true,
      params: {
        requestObject: queryParams?.requestObject,
        pageSize: queryParams?.pageSize,
        orderBy: queryParams?.orderBy,
        pageCurrent: queryParams?.pageCurrent,
      },
    });
  },
  getAllByLang: async (lang: LangCode) => {
    return await client.post<any>("local/getCms_translation_frontend_Bylang", {
      isAuth: true,
      params: {
        requestObject: {
          lang,
        },
      },
    });
  },
  create: async (payload: TranslationPayload) => {
    return await client.post<any>("local/Cms_translation_frontend_Addnew", {
      isAuth: true,
      params: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  update: async (payload: TranslationPayload) => {
    return await client.post<any>("local/Cms_translation_frontend_Edit", {
      isAuth: true,
      params: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  delete: async (id?: number) => {
    return await client.post<ITranslationRs>("local/Cms_Delete", {
      isAuth: true,
      params: {
        requestObject: {
          cat: "cms_translation_frontend",
          recId: id,
          type: "DETAILS",
        },
      },
    });
  },
};
