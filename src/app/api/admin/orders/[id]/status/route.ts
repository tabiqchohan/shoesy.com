import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  req: Request,
  ctx: RouteContext<"/api/admin/orders/[id]/status">
) {
  try {
    const { id } = await ctx.params;
    const { status, note } = await req.json();

    const validStatuses = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id },
      data: {
        status,
        statusLogs: {
          create: { status, note: note || null },
        },
      },
      include: {
        items: {
          include: {
            product: { select: { name: true, slug: true, images: true } },
          },
        },
        statusLogs: { orderBy: { createdAt: "desc" } },
      },
    });

    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update status" },
      { status: 400 }
    );
  }
}
