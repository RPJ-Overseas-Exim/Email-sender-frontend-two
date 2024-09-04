import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const cookies = req.cookies;

  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  if (cookies.get("Authentication") && url.pathname === "/") {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (!cookies.get("Authentication") && url.pathname.match("/dashboard")) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (!cookies.get("Authentication") && url.pathname.match("/users")) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
