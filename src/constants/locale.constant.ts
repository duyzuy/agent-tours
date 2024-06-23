import IconFlagEN from "@/assets/icons/IconFlagEN";
import IconFlagVN from "@/assets/icons/IconFlagVN";
import { LangCode } from "@/models/management/cms/language.interface";
import { Locale } from "@/models/management/cms/language.interface";

import { defaultLocale } from "@/configs/locale";
export const locales: Locale[] = [
    {
        key: LangCode.VI,
        name: "Tiếng Việt",
        nativeName: "Tiếng Việt",
        shortName: "VN",
        icon: IconFlagVN,
    },
    {
        key: LangCode.EN,
        name: "Tiếng Anh",
        nativeName: "English",
        shortName: "EN",
        icon: IconFlagEN,
    },
];

export const localeDefault: Locale = locales[0];
