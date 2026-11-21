import { NextResponse, type NextRequest } from "next/server";
import { isLocale, localeCookie } from "@/lib/i18n/locale";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  const response = request.nextUrl.pathname.startsWith("/admin")
    ? await updateSession(request)
    : NextResponse.next();
  const lang = request.nextUrl.searchParams.get("lang");
  if (isLocale(lang)) {
    response.cookies.set(localeCookie, lang, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|videos).*)"],
};
