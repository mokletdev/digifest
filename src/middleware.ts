import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

import { protectedRoutes } from "./utils/protectedRoutes";

export default withAuth(function middleware(req) {
  const { token } = req.nextauth;
  const { pathname } = req.nextUrl;

  if (!token) return NextResponse.redirect("/api/auth/signin");
  if (token.role === "USER") {
    return NextResponse.rewrite(new URL("/unauthorized", req.url), {
      status: 403,
    });
  }

  const route = protectedRoutes.find((route) => route.regex.test(pathname));

  const hasAccess =
    route && (route.roles == "All" || route.roles.includes(token.role));

  if (route && !hasAccess) {
    return NextResponse.rewrite(new URL("/unauthorized", req.url), {
      status: 403,
    });
  }
});

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
