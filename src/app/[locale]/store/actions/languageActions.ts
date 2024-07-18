import { ICustomerProfile } from "@/models/customerAuth.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import { LanguageContentContainer } from "../type";

export enum ELanguageActionType {
  INIT_LANGUAGE = "INIT_LANGUAGE",
  SET_CMSCONTENT_TOUR = "SET_CMSCONTENT_TOUR",
  SET_PAGE_CONTENT = "SET_PAGE_CONTENT",
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
      type: ELanguageActionType.SET_PAGE_CONTENT;
      payload: { lang: LangCode; slug: string }[];
    }
  | {
      type: ELanguageActionType.SET_CMSCONTENT_TOUR;
      payload: LanguageContentContainer["tour"];
    };

export const initLanguageAction = (data: { name: string; code: LangCode }) => {
  return {
    type: ELanguageActionType.INIT_LANGUAGE,
    payload: data,
  };
};

export enum ECustomerActionType {
  SET_PROFILE = "SET_PROFILE",
}

export type CustomerAuthAction = {
  type: ECustomerActionType.SET_PROFILE;
  payload: ICustomerProfile;
};
