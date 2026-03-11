import createMiddleware from "next-intl/middleware";
import {NextResponse, type NextRequest} from "next/server";
import {routing} from "@/i18n/routing";
import {
  getAliasTarget,
  getLocalizedPath,
  getPrefixedAliasRedirect,
  normalizePathname,
  resolveLocaleForUnprefixedPath
} from "@/lib/routes";

const handleI18nRouting = createMiddleware(routing);
const localeLikePrefixPattern = /^\/([a-z]{2})(?:\/|$)/i;

function hasUnsupportedLocaleLikePrefix(pathname: string) {
  const match = localeLikePrefixPattern.exec(pathname);
  return Boolean(match && !routing.locales.includes(match[1] as (typeof routing.locales)[number]));
}

function redirectWithStatus(request: NextRequest, pathname: string, status: 307 | 308) {
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = pathname;
  return NextResponse.redirect(redirectUrl, {status});
}

export default function proxy(request: NextRequest) {
  const pathname = normalizePathname(request.nextUrl.pathname);

  if (pathname === "/") {
    const locale = resolveLocaleForUnprefixedPath(request);
    return redirectWithStatus(request, getLocalizedPath("home", locale), 307);
  }

  const prefixedRedirect = getPrefixedAliasRedirect(pathname);
  if (prefixedRedirect) {
    return redirectWithStatus(request, prefixedRedirect, 308);
  }

  const unprefixedTarget = getAliasTarget(pathname);
  if (unprefixedTarget) {
    const locale = resolveLocaleForUnprefixedPath(request);
    return redirectWithStatus(request, unprefixedTarget[locale], 307);
  }

  if (hasUnsupportedLocaleLikePrefix(pathname)) {
    return NextResponse.next();
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"]
};
