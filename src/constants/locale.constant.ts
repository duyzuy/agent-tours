import { LangCode } from "@/models/management/cms/language.interface";
import { Locale } from "@/models/management/cms/language.interface";
import IconFlagENCircle from "@/assets/icons/IconFlagENCircle";
import IconFlagVNCircle from "@/assets/icons/IconFlagVNCircle";
import { defaultLocale } from "@/configs/locale";
export const locales: Locale[] = [
  {
    key: LangCode.VI,
    name: "Tiếng Việt",
    nativeName: "Tiếng Việt",
    shortName: "VN",
    icon: IconFlagVNCircle,
  },
  {
    key: LangCode.EN,
    name: "Tiếng Anh",
    nativeName: "English",
    shortName: "EN",
    icon: IconFlagENCircle,
  },
];

export const localeDefault: Locale = locales[0];
