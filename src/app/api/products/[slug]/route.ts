import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _req: Request,
  ctx: RouteContext<"/api/products/[slug]">
) {
  try {
    const { slug } = await ctx.params;

    let product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: { select: { name: true, slug: true } },
        reviews: {
          include: { user: { select: { name: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!product) {
      product = await prisma.product.findUnique({
        where: { id: slug },
        include: {
          category: { select: { name: true, slug: true } },
          reviews: {
            include: { user: { select: { name: true } } },
            orderBy: { createdAt: "desc" },
          },
        },
      });
    }

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
