"use client";
import { memo, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { localeDefault, locales } from "@/constants/locale.constant";
import { LangCode, Locale } from "@/models/management/cms/language.interface";
import { useLanguageSelector } from "../../hooks/useLanguage";
import LanguageSelector from "@/components/frontend/LanguageSelector";
import { getPathname } from "@/utils/navigation";

// When the user is on `/de/ueber-uns`, this will be `/about`

enum PageContentType {
    Page = "page",
    Information = "information",
    News = "news",
    Tour = "tour",
}
interface LanguageSwitcherProps {
    className?: string;
}
const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
    className = "",
}) => {
    const languageInformation = useLanguageSelector((state) => state);

    const pathname = usePathname();

    // console.log(languageInformation);
    const router = useRouter();

    const currentLocale = useMemo(() => {
        const langCode = pathname.split("/")[1] as LangCode;
        return locales.find((lc) => lc.key === langCode) || localeDefault;
    }, [locales]);

    // const onSwitchLang = useSwitchLanguage();
    const handleSelectLanguage = (locale: Locale) => {
        const langCode = locale.key;

        if (currentLocale.key === langCode) return;

        let newPathname = "";
        const pageContentType = pathname
            .split("/")
            .slice(2, 3)
            .join() as PageContentType;

        // switch (pageContentType) {
        //     case PageContentType["Page"]: {
        //         const itemNextLang = languageInformation.page.find(
        //             (item) => item.lang === langCode,
        //         );

        //         if (itemNextLang) {
        //             newPathname = PageContentType["Page"].concat(
        //                 "/",
        //                 itemNextLang.slug,
        //             );
        //         }
        //         break;
        //     }
        //     case PageContentType["Tour"]: {
        //         const itemNextLang = languageInformation.tour.find(
        //             (item) => item.lang === langCode,
        //         );

        //         if (itemNextLang) {
        //             newPathname = PageContentType["Tour"].concat(
        //                 "/",
        //                 itemNextLang.slug,
        //             );
        //         }
        //         break;
        //     }
        //     default: {
        //         newPathname = pathname.split("/").slice(2).join("/");
        //     }
        // }
        if (pageContentType === PageContentType.Page) {
            const itemNextLang = languageInformation.page.find(
                (item) => item.lang === langCode,
            );

            if (itemNextLang) {
                newPathname = PageContentType["Page"].concat(
                    "/",
                    itemNextLang.slug,
                );
            } else {
                newPathname = pathname.split("/").slice(2).join("/");
            }
        } else {
            newPathname = pathname.split("/").slice(2).join("/");
        }
        newPathname = langCode.concat("/", newPathname);

        router.push(`/${newPathname}`);
    };

    return (
        <LanguageSelector
            className={className}
            locales={locales}
            currentLocale={currentLocale}
            onSelectLanguage={handleSelectLanguage}
        />
    );
};
export default memo(LanguageSwitcher);
