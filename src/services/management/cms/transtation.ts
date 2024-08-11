import { getAgToken } from "@/utils/common";
import { client } from "@/services/api";
import { LangCode } from "@/models/management/cms/language.interface";
import { ITranslationListRs, ITranslationRs } from "@/models/management/cms/translations.interface";
import { ITranslationPayload } from "@/models/management/cms/translations.interface";
export const translationAPIs = {
  getList: async (queryString: string) => {
    return await client.post<ITranslationListRs>("local/getCms_translation_frontend", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          name: queryString,
        },
        orderBy: {
          sortColumn: "id",
          direction: "desc",
        },
      },
    });
  },
  getAllByLang: async (lang: LangCode) => {
    return await client.post<any>("local/getCms_translation_frontend_Bylang", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          lang,
        },
      },
    });
  },
  create: async (payload: ITranslationPayload) => {
    return await client.post<any>("local/Cms_translation_frontend_Addnew", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  update: async (payload: ITranslationPayload) => {
    return await client.post<any>("local/Cms_translation_frontend_Edit", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  delete: async (id?: number) => {
    return await client.post<ITranslationRs>("local/Cms_Delete", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
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
