import { LangCode } from "@/models/management/cms/language.interface";
import { LanguageContentContainer } from "./language.type";

export type LanguageActions =
  | {
      type: "INIT_LANGUAGE";
      payload: {
        name: string;
        code: LangCode;
      };
    }
  | {
      type: "SET_PAGE_CONTENT";
      payload: { lang: LangCode; slug: string }[];
    }
  | {
      type: "SET_POST_CONTENT";
      payload: { lang: LangCode; slug: string }[];
    }
  | {
      type: "SET_CATEGORY_CONTENT";
      payload: { lang: LangCode; slug: string }[];
    }
  | {
      type: "SET_CMSCONTENT_TOUR";
      payload: LanguageContentContainer["tour"];
    };
