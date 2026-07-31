import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

function isLandingHost(host: string) {
  const h = host.toLowerCase().split(":")[0];
  return (
    h === "landing.tavswebs.com" ||
    h === "landing.localhost" ||
    h.startsWith("landing.")
  );
}

export default function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  // Allow /landing on main domain too (preview) without locale prefix
  if (pathname === "/landing" || pathname.startsWith("/landing/")) {
    return NextResponse.next();
  }

  // Facebook lead-gen landing on subdomain → rewrite to /landing
  if (isLandingHost(host)) {
    if (
      pathname.startsWith("/api") ||
      pathname.startsWith("/_next") ||
      pathname.startsWith("/portfolio") ||
      pathname.startsWith("/services") ||
      pathname.startsWith("/icon") ||
      pathname.startsWith("/apple-icon") ||
      pathname.startsWith("/og") ||
      pathname.includes(".")
    ) {
      return NextResponse.next();
    }

    if (pathname === "/" || pathname === "") {
      const url = request.nextUrl.clone();
      url.pathname = "/landing";
      return NextResponse.rewrite(url);
    }

    if (!pathname.startsWith("/landing")) {
      const url = request.nextUrl.clone();
      url.pathname = `/landing${pathname}`;
      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(lv|en)/:path*",
    "/landing",
    "/landing/:path*",
    "/((?!api|og|icon|apple-icon|manifest|_next|_vercel|.*\\..*).*)",
  ],
};
