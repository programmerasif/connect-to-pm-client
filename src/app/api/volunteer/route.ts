import prisma from "@/db/db.config";
import { VolunteerSchema } from "@/schema/volunteer.schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const volunteers = await prisma.volunteer.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ success: true, data: volunteers });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = VolunteerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { name, email, number, address } = parsed.data;

  const existing = await prisma.volunteer.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      {
        success: false,
        error: "This email is already registered as a volunteer.",
      },
      { status: 409 },
    );
  }

  const volunteer = await prisma.volunteer.create({
    data: { name, email, number, address },
  });

  return NextResponse.json({ success: true, data: volunteer }, { status: 201 });
}
