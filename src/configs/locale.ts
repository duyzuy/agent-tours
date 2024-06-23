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

// export const port = process.env.PORT || 3000;
// export const host = process.env.VERCEL_URL
//     ? `https://${process.env.VERCEL_URL}`
//     : `http://localhost:${port}`;
