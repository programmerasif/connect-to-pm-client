"use server";

import { cookies } from "next/headers";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthResult {
  success: boolean;
  error?: string;
}

// ─── Token storage key (in-memory proxy map) ─────────────────────────────────
// The access token is stored in an httpOnly cookie so the middleware can read it.
const ACCESS_TOKEN_COOKIE = "accessToken";
const ACCESS_TOKEN_MAX_AGE = 60 * 15; // 15 minutes

// ─── Login ────────────────────────────────────────────────────────────────────

export async function loginAction(
  email: string,
  password: string,
): Promise<AuthResult> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/admin-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    const json = await res.json();

    if (!res.ok || !json.success) {
      const msg =
        typeof json.error === "string"
          ? json.error
          : "Invalid email or password";
      return { success: false, error: msg };
    }

    const { accessToken } = json.data as { accessToken: string };

    // Persist access token in a secure, httpOnly cookie so middleware can read it
    const cookieStore = await cookies();
    const secure = process.env.NODE_ENV === "production";

    cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });

    return { success: true };
  } catch (err) {
    console.error("[loginAction]", err);
    return { success: false, error: "Network error. Please try again." };
  }
}

// ─── Refresh ──────────────────────────────────────────────────────────────────

export async function refreshAction(): Promise<AuthResult> {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return { success: false, error: "No refresh token" };
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Forward the cookie manually for server-side fetch
        Cookie: `refreshToken=${refreshToken}`,
      },
      cache: "no-store",
    });

    const json = await res.json();

    if (!res.ok || !json.success) {
      return { success: false, error: "Session expired. Please log in again." };
    }

    const { accessToken } = json.data as { accessToken: string };
    const secure = process.env.NODE_ENV === "production";

    cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });

    return { success: true };
  } catch (err) {
    console.error("[refreshAction]", err);
    return { success: false, error: "Failed to refresh session." };
  }
}

// ─── Logout ───────────────────────────────────────────────────────────────────

export async function logoutAction(): Promise<void> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    await fetch(`${baseUrl}/api/auth/logout`, {
      method: "POST",
      cache: "no-store",
    });
  } catch (_) {
    // best-effort
  }

  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN_COOKIE, "", { maxAge: 0, path: "/" });
  cookieStore.set("refreshToken", "", { maxAge: 0, path: "/" });
}