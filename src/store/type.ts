import { LangCode } from "@/models/management/cms/language.interface";
import { IModalManagers } from "./type/modal.type";
import { ICustomerProfile } from "@/models/fe/profile.interface";
import { FeBookingInformation } from "@/app/[locale]/(booking)/modules/booking.interface";

export interface AppActions {
  type: string;
  payload?: any;
}

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

interface ILanguageContentContainer {
  locale?: {
    name: string;
    code: LangCode;
  };
  page: { lang: LangCode; slug: string }[];
  tour: { lang: LangCode; slug: string }[];
  post: { lang: LangCode; slug: string }[];
  category: { lang: LangCode; slug: string }[];
}
export class LanguageContentContainer implements ILanguageContentContainer {
  locale?: {
    name: string;
    code: LangCode;
  };
  page: { lang: LangCode; slug: string }[];
  tour: { lang: LangCode; slug: string }[];
  post: { lang: LangCode; slug: string }[];
  category: { lang: LangCode; slug: string }[];
  constructor(
    locale:
      | {
          name: string;
          code: LangCode;
        }
      | undefined,
    page: { lang: LangCode; slug: string }[],
    tour: { lang: LangCode; slug: string }[],
    post: { lang: LangCode; slug: string }[],
    category: { lang: LangCode; slug: string }[],
  ) {
    this.locale = locale;
    this.page = page;
    this.tour = tour;
    this.post = post;
    this.category = category;
  }
}

export interface AppContainer {
  locale?: {
    name: string;
    code: LangCode;
  };
  languageContainer?: ILanguageContentContainer;
  modalContainer?: IModalManagers;
  user?: ICustomerProfile;
  bookingContainer: FeBookingInformation;
}
