// import { locales } from "@/configs/locale";
// import { LangCode } from "@/models/management/cms/language.interface";
// import { localeDefault } from "@/constants/locale.constant";
// function getLocale(pathname: string) {
//   const langCode = pathname.split("/")[1] as LangCode;
//   const locale = locales.find((lc) => lc.key === langCode);
//   return locale ?? localeDefault;
// }

// export const LanguageContext = createContext<[LanguageContentContainer, React.Dispatch<LanguageActions>] | undefined>(
//   undefined,
// );

// export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
//   const pathname = usePathname();
//   const locale = getLocale(pathname);

//   const [state, dispatch] = useReducer(languageReducer, {
//     ...initLanguageState,
//     locale: locale ? { name: locale.name, code: locale.key } : undefined,
//   });

//   return <LanguageContext.Provider value={[state, dispatch]}>{children}</LanguageContext.Provider>;
// };
