import { LangCode } from "@/models/management/cms/language.interface";
export class LanguageContentContainer {
    locale?: {
        name: string;
        code: LangCode;
    };
    page: { lang: LangCode; slug: string }[];
    tour: { lang: LangCode; slug: string }[];
    constructor(
        locale:
            | {
                  name: string;
                  code: LangCode;
              }
            | undefined,
        page: { lang: LangCode; slug: string }[],
        tour: { lang: LangCode; slug: string }[],
    ) {
        this.locale = locale;
        this.page = page;
        this.tour = tour;
    }
}
