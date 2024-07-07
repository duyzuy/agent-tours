import { NextRequest, NextResponse } from "next/server";
import { locales, localeDefault } from "./constants/locale.constant";
import createMiddleware from "next-intl/middleware";
import { CLIENT_LINKS } from "./constants/client/clientRouter.constant";

const intlMiddleware = createMiddleware({
  locales: ["vi", "en"],
  defaultLocale: "vi",
});

export default function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const { cookies } = request;

  /**
   * Add url to request
   */

  const url = new URL(request.url);
  const origin = url.origin;
  const requestHeaders = new Headers(request.headers);
  //   requestHeaders.set("x-url", request.url);
  //   requestHeaders.set("x-origin", origin);
  //   requestHeaders.set("x-pathname", pathname);

  request.headers.set("x-url", request.url);
  request.headers.set("x-pathname", pathname);
  const sessionToken = cookies.get("next-auth.session-token");
  // const session = await getServerSession(authOptions);

  const isAuth = !!sessionToken;

  const [_, locale, pathStr] = pathname.split("/");

  const isAuthPage = pathStr === CLIENT_LINKS.CustomerLogin || pathStr === CLIENT_LINKS.CustomerRegister;

  // const isAuth = !!session;
  /**
   * IF IS PORTAL NO NEED TO CONFIG LANGUAGE
   */
  const isAdminPortal = pathname.startsWith("/portal/") || pathname.startsWith("/ag/");

  if (isAdminPortal) {
    return NextResponse.next();
  }

  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL("/customer", request.url));
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale.key}/`) || pathname === `/${locale.key}`,
  );

  if (!pathnameHasLocale) {
    // const locale = getLocale(request);
    const pathnameWithLocale = `${request.nextUrl.origin}/${localeDefault.key}`;
    return NextResponse.redirect(pathnameWithLocale);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|favicon.ico|image|static|api|auth|assets|uploads|service-worker).*)",
    // Optional: only run on root (/) URL
    // "/",
    // "/portal/:path*",
  ],
};
