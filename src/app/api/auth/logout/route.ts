import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ success: true }, { status: 200 });
  // Clear cookie
  res.cookies.set("refreshToken", "", { httpOnly: true, maxAge: 0, path: "/" });
  return res;
}
