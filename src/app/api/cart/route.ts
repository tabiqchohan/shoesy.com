import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json([]);
    }

    const items = await prisma.cartItem.findMany({
      where: { userId: (session.user as any).id },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            salePrice: true,
            images: true,
            stock: true,
          },
        },
      },
    });

    return NextResponse.json(items);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const userId = (session.user as any).id;

    const existing = await prisma.cartItem.findFirst({
      where: {
        userId,
        productId: body.productId,
        size: body.size,
      },
    });

    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + (body.quantity || 1) },
      });
      return NextResponse.json(updated);
    }

    const item = await prisma.cartItem.create({
      data: {
        userId,
        productId: body.productId,
        quantity: body.quantity || 1,
        size: body.size,
        color: body.color || null,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to add to cart" },
      { status: 500 }
    );
  }
}
