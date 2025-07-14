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
 * Only handle if user has Coockie.
 * Check coockie valid via api #localfront/getProfile
 * If Coockie is not valid -> Delete
 * If Coockie valid and it's Auth Routes -> Redirect user to profile page.
 * If Coockie valid and itsn't Auth Routes return next response.
 */
async function applyCustomerAuthMiddleware(
  request: NextRequest,
  options: { authRoutes: string[]; redirectUrl: URL; session: JWT },
) {
  const { pathname } = request.nextUrl;
  const [_, __, pathStr] = pathname.split("/");

  const isAuthRoute = options.authRoutes.includes(pathStr);

  if (isAuthRoute) {
    return NextResponse.redirect(options.redirectUrl);
  }

  return intlMiddleware(request);
}

export default async function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const { cookies } = request;
  /**
   * Add new url to request
   */
  request.headers.set("x-url", request.url);
  request.headers.set("x-pathname", pathname);

  const [_, locale, pathStr] = pathname.split("/");
  let COOCKIE_NAME = "next-auth.session-token";

  if (process.env.NODE_ENV === "production") {
    COOCKIE_NAME = "__Secure-" + COOCKIE_NAME;
  }
  const token = cookies.get(COOCKIE_NAME)?.value;
  const secret = process.env.NEXTAUTH_SECRET;

  let session = null;

  if (token && secret) {
    session = await decode({ token, secret });
  }

  /**
   * Ignore if is Admin portal
   */
  const isAdminPortal = pathname.startsWith("/portal/") || pathname.startsWith("/admin-auth/");

  if (isAdminPortal) {
    return NextResponse.next();
  }

  if (session) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/${locale}/customer`;

    return await applyCustomerAuthMiddleware(request, {
      session: session,
      authRoutes: [CLIENT_LINKS.CustomerLogin, CLIENT_LINKS.CustomerRegister],
      redirectUrl: newUrl,
    });
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
