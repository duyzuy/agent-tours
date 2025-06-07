import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { CLIENT_LINKS } from "./constants/client/clientRouter.constant";
import { serverRequest } from "./services/serverApi";
import { CustomerProfileResponse } from "./models/fe/profile.interface";
import { BaseResponse } from "./models/common.interface";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

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
  options: { authRoutes: string[]; redirectUrl: URL; coockie: RequestCookie },
) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  const [_, locale, pathStr] = pathname.split("/");

  const isAuthRoute = options.authRoutes.includes(pathStr);

  // const userProfile = await serverRequest.post<CustomerProfileResponse, BaseResponse<null>>("localfront/getProfile", {
  //   next: { tags: ["customerProfile"] },
  //   headers: {
  //     Authorization: `Bearer ${encodeURIComponent(options.coockie.value)}`,
  //   },
  //   params: {
  //     requestObject: {},
  //   },
  // });

  // if (!userProfile) {
  //   // response.cookies.delete("next-auth.session-token");
  //   // response.cookies.delete("__Secure-next-auth.session-token");
  //   return response;
  // }

  if (isAuthRoute) {
    return NextResponse.redirect(options.redirectUrl);
  }

  return response;
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

  const sessionToken = cookies.get("next-auth.session-token");

  /**
   * Ignore if is Admin portal
   */
  const isAdminPortal = pathname.startsWith("/portal/") || pathname.startsWith("/admin-auth/");

  if (isAdminPortal) {
    return NextResponse.next();
  }

  if (sessionToken) {
    return await applyCustomerAuthMiddleware(request, {
      coockie: sessionToken,
      authRoutes: [CLIENT_LINKS.CustomerLogin, CLIENT_LINKS.CustomerRegister],
      redirectUrl: new URL(`/${locale}/customer`, request.url),
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
