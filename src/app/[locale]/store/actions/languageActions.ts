import { ICustomerProfile } from "@/models/customerAuth.interface";
import { LangCode } from "@/models/management/cms/language.interface";

export enum ELanguageActionType {
    INIT_LANGUAGE = "INIT_LANGUAGE",
    FETCH_CONTENT_TYPE = "FETCH_CONTENT_TYPE",
}

export type LanguageActions =
    | {
          type: ELanguageActionType.INIT_LANGUAGE;
          payload: {
              name: string;
              code: LangCode;
          };
      }
    | {
          type: ELanguageActionType.FETCH_CONTENT_TYPE;
          payload: { lang: LangCode; slug: string }[];
      };

export const initLanguageAction = (data: { name: string; code: LangCode }) => {
    return {
        type: ELanguageActionType.INIT_LANGUAGE,
        payload: data,
    };
};

export const initPageContentAction = (
    content?: { lang: LangCode; slug: string }[],
) => {
    return {
        type: ELanguageActionType.FETCH_CONTENT_TYPE,
        payload: content,
    };
};

export enum ECustomerActionType {
    SET_PROFILE = "SET_PROFILE",
}

export type CustomerAuthAction = {
    type: ECustomerActionType.SET_PROFILE;
    payload: ICustomerProfile;
};
