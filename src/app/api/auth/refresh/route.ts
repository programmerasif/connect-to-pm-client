import { NextRequest, NextResponse } from "next/server";
import {
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
  REFRESH_EXPIRES,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const cookie = req.cookies.get("refreshToken");
    const token = cookie?.value;
    if (!token)
      return NextResponse.json(
        { success: false, error: "Missing refresh token" },
        { status: 401 },
      );

    const payload = verifyRefreshToken(token);
    if (!payload || payload.type !== "refresh") {
      return NextResponse.json(
        { success: false, error: "Invalid refresh token" },
        { status: 401 },
      );
    }

    const userId = payload.sub;
    // Rotate tokens: issue new access + refresh
    const accessToken = signAccessToken(userId);
    const refreshToken = signRefreshToken(userId);

    const res = NextResponse.json(
      { success: true, data: { accessToken } },
      { status: 200 },
    );
    const secure = process.env.NODE_ENV === "production";
    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: REFRESH_EXPIRES,
    });

    return res;
  } catch (e) {
    return NextResponse.json(
      { success: false, error: String(e) },
      { status: 401 },
    );
  }
}
