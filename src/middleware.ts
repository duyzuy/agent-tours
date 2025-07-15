import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { CLIENT_LINKS } from "./constants/client/clientRouter.constant";
import { decode, JWT } from "next-auth/jwt";

const intlMiddleware = createMiddleware({
  locales: ["vi", "en"],
  defaultLocale: "vi",
  // localePrefix: "as-needed",
});

/**
 * Only handle if user has Cookie.
 * Check cookie valid via api #localfront/getProfile
 * If Cookie is not valid -> Delete
 * If Cookie valid and it's Auth Routes -> Redirect user to profile page.
 * If Cookie valid and itsn't Auth Routes return next response.
 */
async function applyCustomerAuthMiddleware(
  request: NextRequest,
  options: { authRoutes: string[]; redirectUrl: URL; session: JWT },
) {
  const { pathname } = request.nextUrl;

  const pathSegments = pathname.split("/").filter(Boolean);
  const locale = pathSegments[0];

  const isAuthRoute = options.authRoutes.some((route) => pathname.startsWith(`/${locale}/${route}`));

  if (isAuthRoute) {
    return NextResponse.redirect(options.redirectUrl);
  }

  return intlMiddleware(request);
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { cookies } = request;
  /**
   * Inject url to request
   */
  request.headers.set("x-url", request.url);
  request.headers.set("x-pathname", pathname);

  const [_, locale, pathStr] = pathname.split("/");
  let COOKIE_NAME = "next-auth.session-token";

  if (process.env.NODE_ENV === "production") {
    COOKIE_NAME = `__Secure-${COOKIE_NAME}`;
  }
  const token = cookies.get(COOKIE_NAME)?.value;
  const secret = process.env.NEXTAUTH_SECRET;

  let session: JWT | null = null;

  if (token && secret) {
    const response = NextResponse.next();

    try {
      session = await decode({ token, secret });
    } catch (err) {
      console.error({ err }, "==============================");
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
  }

  /**
   * Ignore if is Admin portal
   */
  const isAdminPortal = pathname.startsWith("/portal/") || pathname.startsWith("/admin-auth/");

  if (isAdminPortal) return NextResponse.next();

  if (session) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/${locale}/customer`;

    return await applyCustomerAuthMiddleware(request, {
      session,
      authRoutes: [CLIENT_LINKS.CustomerLogin, CLIENT_LINKS.CustomerRegister],
      redirectUrl: newUrl,
    });
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|favicon.ico|image|static|api|auth|assets|uploads|service-worker|portal|admin-auth).*)",
    // Optional: only run on root (/) URL
    // "/",
    // "/portal/:path*",
  ],
};
