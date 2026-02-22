import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, type JWTPayload } from "jose";

// ─── Config ───────────────────────────────────────────────────────────────────

const ACCESS_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "change-me-access-secret",
);
const REFRESH_SECRET = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET ??
    process.env.JWT_SECRET ??
    "change-me-refresh-secret",
);

/** Routes that are always public (no token required) */
const PUBLIC_PATHS = [
  "/login",
  "/api/admin-user",
  "/api/auth/refresh",
  "/api/auth/logout",
];

/** Routes that start with these prefixes and are protected */
const PROTECTED_PREFIXES = ["/dashboard", "/api/protected"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isPublic(pathname: string): boolean {
  return PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
}

function isProtected(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
}

async function verifyAccessToken(
  token: string,
): Promise<(JWTPayload & { sub: string; type: string }) | null> {
  try {
    const { payload } = await jwtVerify(token, ACCESS_SECRET);
    if (payload.type !== "access" || !payload.sub) return null;
    return payload as JWTPayload & { sub: string; type: string };
  } catch {
    return null;
  }
}

async function verifyRefreshToken(
  token: string,
): Promise<(JWTPayload & { sub: string; type: string }) | null> {
  try {
    const { payload } = await jwtVerify(token, REFRESH_SECRET);
    if (payload.type !== "refresh" || !payload.sub) return null;
    return payload as JWTPayload & { sub: string; type: string };
  } catch {
    return null;
  }
}

/** Call the refresh endpoint from within the middleware and return a new accessToken */
async function rotateTokens(
  req: NextRequest,
): Promise<{ accessToken: string; refreshToken: string } | null> {
  try {
    const refreshCookie = req.cookies.get("refreshToken")?.value;
    if (!refreshCookie) return null;

    const origin = req.nextUrl.origin;
    const res = await fetch(`${origin}/api/auth/refresh`, {
      method: "POST",
      headers: { Cookie: `refreshToken=${refreshCookie}` },
    });

    if (!res.ok) return null;

    const json = await res.json();
    if (!json.success) return null;

    // Extract the newly rotated refreshToken from Set-Cookie header
    const setCookie = res.headers.get("set-cookie") ?? "";
    const newRefreshMatch = setCookie.match(/refreshToken=([^;]+)/);
    const newRefresh = newRefreshMatch?.[1] ?? refreshCookie;

    return {
      accessToken: json.data.accessToken as string,
      refreshToken: newRefresh,
    };
  } catch {
    return null;
  }
}

// ─── Middleware ───────────────────────────────────────────────────────────────

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Always allow public paths through
  if (isPublic(pathname)) {
    return NextResponse.next();
  }

  // 2. Only enforce auth on protected prefixes (everything else passes through)
  if (!isProtected(pathname)) {
    return NextResponse.next();
  }

  const secure = process.env.NODE_ENV === "production";
  let accessToken = req.cookies.get("accessToken")?.value ?? "";

  console.log(accessToken, "access token");

  // 3. Try to verify the existing access token
  let payload = accessToken ? await verifyAccessToken(accessToken) : null;

  // 4. Access token invalid / missing — try refreshing
  if (!payload) {
    const rotated = await rotateTokens(req);

    if (!rotated) {
      // No valid session at all → redirect to login
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Re-verify the brand-new access token
    payload = await verifyAccessToken(rotated.accessToken);
    if (!payload) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/login";
      return NextResponse.redirect(loginUrl);
    }

    accessToken = rotated.accessToken;

    // Build the response and attach refreshed cookies
    const response = NextResponse.next();

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15, // 15 minutes
    });

    response.cookies.set("refreshToken", rotated.refreshToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Forward userId to downstream route handlers via header
    response.headers.set("x-user-id", payload.sub);
    return response;
  }

  const response = NextResponse.next();
  response.headers.set("x-user-id", payload.sub);
  return response;
}

// ─── Matcher ──────────────────────────────────────────────────────────────────

export const config = {
  /*
   * Match all request paths EXCEPT:
   *  - _next/static  (static files)
   *  - _next/image   (image optimisation)
   *  - favicon.ico
   *  - public assets
   */
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
