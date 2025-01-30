"use client";
import { localeDefault, locales } from "@/constants/locale.constant";
import { LanguageActions } from "./languageActions";
import { LanguageContentContainer } from "./language.type";
import { createContext, useContext, useReducer } from "react";
import { LangCode } from "@/models/management/cms/language.interface";
import { usePathname } from "next/navigation";
import { initLanguageState, languageReducer } from "./languageReducer";

function getLocale(pathname: string) {
  const langCode = pathname.split("/")[1] as LangCode;
  const locale = locales.find((lc) => lc.key === langCode);
  return locale ?? localeDefault;
}

export const LanguageContext = createContext<[LanguageContentContainer, React.Dispatch<LanguageActions>] | undefined>(
  undefined,
);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const locale = getLocale(pathname);

  const [state, dispatch] = useReducer(languageReducer, {
    ...initLanguageState,
    locale: locale ? { name: locale.name, code: locale.key } : undefined,
  });

  return <LanguageContext.Provider value={[state, dispatch]}>{children}</LanguageContext.Provider>;
};

export const useLanguageSelector = <T,>(selector: (state: LanguageContentContainer) => T) => {
  const languages = useContext(LanguageContext);

  if (!languages) {
    throw new Error("Hook must use under language provider");
  }
  const [state, _] = languages;

  return selector(state);
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("Hook must use under language provider");
  }

  return context;
};
