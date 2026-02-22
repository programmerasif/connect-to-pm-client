import prisma from "@/db/db.config";
import { AdminUserValidationSchema } from "@/schema/admin.schema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signAccessToken, signRefreshToken, REFRESH_EXPIRES } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = AdminUserValidationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { email, password } = parsed.data;

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 },
    );
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 },
    );
  }

  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(user.id);

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
}
