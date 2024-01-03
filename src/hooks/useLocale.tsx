import { localeDefault } from "@/constants/locale.constant";
import { useState } from "react";

export interface ILocale {}
export const useLocale = () => {
    const [locale, setLocale] = useState(localeDefault);

    return { locale, setLocale };
};
