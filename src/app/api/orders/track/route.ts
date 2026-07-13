import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const number = searchParams.get("number");
    const phone = searchParams.get("phone");

    if (!number || !phone) {
      return NextResponse.json(
        { error: "Order number and phone are required" },
        { status: 400 }
      );
    }

    const order = await prisma.order.findFirst({
      where: { orderNumber: number, phone },
      include: {
        statusLogs: { orderBy: { createdAt: "desc" } },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch {
    return NextResponse.json(
      { error: "Failed to track order" },
      { status: 500 }
    );
  }
}
