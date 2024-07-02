"use client";
import React, { useEffect, useMemo } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { usePathname } from "next/navigation";
import {
    ELanguageActionType,
    initLanguageAction,
} from "../../store/actions/languageActions";

import { locales, localeDefault } from "@/constants/locale.constant";
import { LangCode } from "@/models/management/cms/language.interface";
const LangContainer: React.FC = () => {
    const [_, dispatch] = useLanguage();

    const pathname = usePathname();

    const langCode = pathname.split("/")[1] as LangCode;

    const currentLocale = useMemo(() => {
        return locales.find((lc) => lc.key === langCode) || localeDefault;
    }, [locales]);

    useEffect(() => {
        dispatch({
            type: ELanguageActionType.INIT_LANGUAGE,
            payload: {
                name: currentLocale.name,
                code: currentLocale.key,
            },
        });
    }, [currentLocale]);
    return null;
};
export default LangContainer;
