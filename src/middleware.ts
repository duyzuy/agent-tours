import { NextRequest, NextResponse } from "next/server";
import { locales, localeDefault } from "./constants/locale.constant";
import createMiddleware from "next-intl/middleware";
import { CLIENT_LINKS } from "./constants/client/clientRouter.constant";

const intlMiddleware = createMiddleware({
    locales: ["vi", "en"],
    defaultLocale: "vi",
});

// const authMiddleware = withAuth(
//     // Note that this callback is only invoked if
//     // the `authorized` callback has returned `true`
//     // and not for pages listed in `pages`.
//     (req: NextRequest) => intlMiddleware(req),
//     {
//         callbacks: {
//             authorized: ({ req: { cookies } }) => {
//                 const sessionToken = cookies.get("next-auth.session-token");
//                 return sessionToken != null;
//             },
//         },
//         pages: {
//             signIn: CLIENT_LINKS.CustomerLogin,
//         },
//     },
// );

export default function middleware(request: NextRequest) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl;
    const { cookies } = request;

    const sessionToken = cookies.get("next-auth.session-token");
    // const session = await getServerSession(authOptions);

    const isAuth = !!sessionToken;

    const [_, locale, pathStr] = pathname.split("/");

    const isAuthPage =
        pathStr === CLIENT_LINKS.CustomerLogin ||
        pathStr === CLIENT_LINKS.CustomerRegister;

    // const isAuth = !!session;
    /**
     * IF IS PORTAL NO NEED TO CONFIG LANGUAGE
     */
    const isAdminPortal =
        pathname.startsWith("/portal/") || pathname.startsWith("/ag/");

    if (isAdminPortal) {
        return NextResponse.next();
    }

    if (isAuthPage && isAuth) {
        return NextResponse.redirect(new URL("/customer", request.url));
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

    return intlMiddleware(request);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        "/((?!_next|favicon.ico|image|static|api|assets|auth|uploads|service-worker).*)",
        // Optional: only run on root (/) URL
        // '/'
        // "/portal/:path*",
    ],
};
