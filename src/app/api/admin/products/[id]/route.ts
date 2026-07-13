import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  req: Request,
  ctx: RouteContext<"/api/admin/products/[id]">
) {
  try {
    const { id } = await ctx.params;
    const body = await req.json();

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        price: body.price,
        salePrice: body.salePrice || null,
        images: body.images || [],
        sizes: body.sizes || [],
        colors: body.colors || [],
        stock: body.stock || 0,
        categoryId: body.categoryId,
        featured: body.featured || false,
        isNew: body.isNew ?? true,
      },
    });

    return NextResponse.json(product);
  } catch {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _req: Request,
  ctx: RouteContext<"/api/admin/products/[id]">
) {
  try {
    const { id } = await ctx.params;
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 400 }
    );
  }
}
