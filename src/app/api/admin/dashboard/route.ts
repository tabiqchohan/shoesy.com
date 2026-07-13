import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [totalOrders, totalProducts, totalCustomers, revenue] =
      await Promise.all([
        prisma.order.count(),
        prisma.product.count(),
        prisma.user.count({ where: { role: "customer" } }),
        prisma.order.aggregate({
          _sum: { total: true },
          where: { status: "delivered" },
        }),
      ]);

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });

    return NextResponse.json({
      totalOrders,
      totalProducts,
      totalCustomers,
      totalRevenue: revenue._sum.total || 0,
      recentOrders,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
