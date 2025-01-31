"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { locales } from "@/constants/locale.constant";
import { LangCode } from "@/models/management/cms/language.interface";
import { localeDefault } from "@/constants/locale.constant";
import { usePathname } from "next/navigation";

function getLocale(pathname: string) {
  const langCode = pathname.split("/")[1] as LangCode;
  const locale = locales.find((lc) => lc.key === langCode);
  return locale ?? localeDefault;
}
const LocalizationContainer = () => {
  const pathname = usePathname();
  const locale = getLocale(pathname);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: "INIT_LANGUAGE",
      payload: {
        name: locale.name,
        code: locale.key,
      },
    });
  }, []);
  return null;
};
export default LocalizationContainer;
