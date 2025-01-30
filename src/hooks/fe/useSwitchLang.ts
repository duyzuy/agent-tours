import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Locale, LangCode } from "@/models/management/cms/language.interface";
import { useLanguageSelector } from "@/store";
import { locales, localeDefault } from "@/constants/locale.constant";

enum PageContentType {
  Page = "page",
  Information = "information",
  News = "news",
  Tour = "tour",
}

const useSwitchLanguage = () => {
  const languageInformation = useLanguageSelector((state) => state);

  const pathname = usePathname();

  const router = useRouter();

  const currentLocale = useMemo(() => {
    const langCode = pathname.split("/")[1] as LangCode;
    return locales.find((lc) => lc.key === langCode) || localeDefault;
  }, [locales]);

  const handleSelectLanguage = (locale: Locale) => {
    const langCode = locale.key;

    if (currentLocale.key === langCode) return;

    let newPathname = "";
    const pageContentType = pathname.split("/").slice(2, 3).join() as PageContentType;

    if (pageContentType === PageContentType.Page) {
      const itemNextLang = languageInformation.page.find((item) => item.lang === langCode);

      if (itemNextLang) {
        newPathname = PageContentType["Page"].concat("/", itemNextLang.slug);
      } else {
        newPathname = pathname.split("/").slice(2).join("/");
      }
    } else {
      newPathname = pathname.split("/").slice(2).join("/");
    }
    newPathname = langCode.concat("/", newPathname);

    router.push(`/${newPathname}`);
  };

  return handleSelectLanguage;
};
export default useSwitchLanguage;
