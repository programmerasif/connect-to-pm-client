import prisma from "@/db/db.config";
import { ComplaintSchema } from "@/schema/complaint.schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const complaints = await prisma.complaint.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ success: true, data: complaints });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = ComplaintSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { name, email, number, address, message } = parsed.data;

  const complaint = await prisma.complaint.create({
    data: {
      name,
      email: email || null,
      number,
      address,
      message,
    },
  });

  return NextResponse.json({ success: true, data: complaint }, { status: 201 });
}
