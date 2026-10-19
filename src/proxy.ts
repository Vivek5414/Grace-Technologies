import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseConfig } from "@/lib/supabase/config";
import type { Database } from "@/types/database";

function hasAdminRole(claims: Record<string, unknown> | null | undefined): boolean {
  const appMetadata = claims?.app_metadata;
  if (typeof appMetadata !== "object" || appMetadata === null) return false;
  return "role" in appMetadata && appMetadata.role === "admin";
}

function redirectToLogin(request: NextRequest, reason: string, response: NextResponse) {
  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("reason", reason);
  const redirectResponse = NextResponse.redirect(loginUrl);

  for (const cookie of response.cookies.getAll()) {
    redirectResponse.cookies.set(cookie);
  }
  for (const header of ["cache-control", "expires", "pragma"]) {
    const value = response.headers.get(header);
    if (value) redirectResponse.headers.set(header, value);
  }

  return redirectResponse;
}

export async function proxy(request: NextRequest) {
  const config = getSupabaseConfig();
  if (!config) return redirectToLogin(request, "setup", NextResponse.next({ request }));

  let response = NextResponse.next({ request });
  const supabase = createServerClient<Database>(config.url, config.publishableKey, {
    cookieOptions: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    },
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
        for (const [name, value] of Object.entries(headers)) {
          response.headers.set(name, value);
        }
      },
    },
  });

  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims as Record<string, unknown> | undefined;
  if (error || !claims) return redirectToLogin(request, "sign-in", response);
  if (!hasAdminRole(claims)) return redirectToLogin(request, "not-admin", response);

  return response;
}

export const config = {
  matcher: [
    "/admin",
    "/admin/dashboard/:path*",
    "/admin/contacts/:path*",
    "/admin/enquiries/:path*",
    "/admin/whatsapp/:path*",
  ],
};
