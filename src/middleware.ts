import { NextRequest, NextResponse } from "next/server";
import { locales, localeDefault } from "./constants/locale.constant";

export function middleware(request: NextRequest) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl;

    /**
     * IF IS PORTAL NO NEED TO CONFIG LANGUAGE
     */
    if (pathname.startsWith("/portal/") || pathname.startsWith("/ag/")) {
        return NextResponse.next();
    }

    const pathnameHasLocale = locales.some(
        (locale) =>
            pathname.startsWith(`/${locale.key}/`) ||
            pathname === `/${locale.key}`,
    );

    if (!pathnameHasLocale) {
        // const locale = getLocale(request);
        const pathnameWithLocale = `${request.nextUrl.origin}/${localeDefault.key}`;
        return NextResponse.redirect(pathnameWithLocale);
    }
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        "/((?!_next|favicon.ico|image|static|api|assets|uploads|service-worker).*)",
        // Optional: only run on root (/) URL
        // '/'
        // "/portal/:path*",
    ],
};
