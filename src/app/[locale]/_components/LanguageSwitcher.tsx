"use client";
import { memo, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { localeDefault, locales } from "@/constants/locale.constant";
import { LangCode, Locale } from "@/models/management/cms/language.interface";
import { useLanguageSelector } from "@/store/language/hooks";
import LanguageButton from "@/components/frontend/LanguageButton";

import { useParams } from "next/navigation";
import { isArray } from "lodash";

enum PageContentType {
  Page = "page",
  Information = "information",
  News = "news",
  Tour = "tour",
  Post = "post",
  Category = "category",
}
interface LanguageSwitcherProps {
  className?: string;
}
const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = "" }) => {
  const { page: pageContent, tour: tourContent, category: categoryContent, post: postContent } = useLanguageSelector();

  const pathname = usePathname();
  const params = useParams();
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

    switch (pageContentType) {
      case PageContentType.Page: {
        const itemNextLang = pageContent.find((item) => item.lang === langCode);
        if (itemNextLang) {
          newPathname = [PageContentType["Page"], itemNextLang.slug].join("/");
        }
        break;
      }

      case PageContentType.Tour: {
        const templateContentslug = isArray(params.slug) ? params.slug.slice(0, 2).join("/") : params.slug;
        const itemTourContent = tourContent.find((item) => item.lang === langCode);
        if (itemTourContent) {
          newPathname = PageContentType["Tour"].concat("/", `${templateContentslug}/${itemTourContent.slug}`);
        }
        break;
      }
      case PageContentType.Category: {
        const itemNextLang = categoryContent.find((item) => item.lang === langCode);
        if (itemNextLang) {
          newPathname = PageContentType["Category"].concat("/", itemNextLang.slug);
        }
      }
      case PageContentType.Post: {
        const itemNextLang = postContent.find((item) => item.lang === langCode);

        if (itemNextLang) {
          newPathname = PageContentType["Post"].concat("/", itemNextLang.slug);
        }
      }
    }

    newPathname = langCode.concat("/", newPathname);

    router.push(`/${newPathname}`);
  };

  return (
    <LanguageButton
      className={className}
      locales={locales}
      currentLocale={currentLocale}
      onSelectLanguage={handleSelectLanguage}
    />
  );
};
export default memo(LanguageSwitcher);
