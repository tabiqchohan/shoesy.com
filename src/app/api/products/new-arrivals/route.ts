import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { isNew: true, stock: { gt: 0 } },
      take: 8,
      orderBy: { createdAt: "desc" },
      include: {
        category: { select: { name: true, slug: true } },
        reviews: { select: { rating: true } },
      },
    });

    return NextResponse.json(products);
  } catch {
    return NextResponse.json([]);
  }
}
