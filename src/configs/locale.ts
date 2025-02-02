import { Pathnames, LocalePrefix } from "next-intl/routing";

export const defaultLocale = "vi" as const;
export const locales = ["vi", "en"] as const;
export const pathnames: Pathnames<typeof locales> = {
  "/": "/",
  "/pathnames": {
    vi: "/pathnames",
    en: "/pfadnamen",
  },
};

export const localePrefix: LocalePrefix<typeof locales> = "always";
