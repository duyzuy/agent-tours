"use client";
import { memo, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { localeDefault, locales } from "@/constants/locale.constant";
import { LangCode, Locale } from "@/models/management/cms/language.interface";
import LanguageButton, { LanguageButtonProps } from "@/components/frontend/LanguageButton";

import { useLanguagePathContent } from "@/hooks/fe/useLanguagePathContent";

interface LanguageSwitcherProps {
  className?: string;
  mode?: LanguageButtonProps["mode"];
  hideLabel?: LanguageButtonProps["hideLabel"];
}
const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = "", mode = "dropdown", hideLabel }) => {
  const { getPathname } = useLanguagePathContent();

  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = useMemo(() => {
    const langCode = pathname.split("/")[1] as LangCode;
    return locales.find((lc) => lc.key === langCode) || localeDefault;
  }, [locales]);

  const handleChangeLanguage = (locale: Locale) => {
    const newContent = getPathname(locale);
    router.push(`/${newContent}`);
  };

  return (
    <LanguageButton
      className={className}
      locales={locales}
      currentLocale={currentLocale}
      onSelectLanguage={handleChangeLanguage}
      mode={mode}
      hideLabel={hideLabel}
    />
  );
};
export default memo(LanguageSwitcher);
