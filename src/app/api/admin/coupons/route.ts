import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const coupon = await prisma.coupon.create({
      data: {
        code: body.code.toUpperCase(),
        discount: body.discount,
        type: body.type || "percentage",
        minOrder: body.minOrder || 0,
        maxUses: body.maxUses || null,
        expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
        isActive: true,
      },
    });

    return NextResponse.json(coupon, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create coupon" },
      { status: 400 }
    );
  }
}
