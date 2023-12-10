import { localeDefault, locales } from "@/constants/locale.constant";
import { useState } from "react";

export interface ILocale {}
export const useLocale = () => {
    const [locale, setLocale] = useState(() => locales.find((locale) => locale.key === localeDefault));

    return { locale, setLocale };
};
