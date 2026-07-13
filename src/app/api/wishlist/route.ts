import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json([]);
    }

    const items = await prisma.wishlist.findMany({
      where: { userId: (session.user as any).id },
      include: {
        product: {
          include: {
            category: { select: { name: true, slug: true } },
            reviews: { select: { rating: true } },
          },
        },
      },
    });

    return NextResponse.json(items.map((i) => i.product));
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

    const { productId } = await req.json();
    const userId = (session.user as any).id;

    const existing = await prisma.wishlist.findFirst({
      where: { userId, productId },
    });

    if (existing) {
      await prisma.wishlist.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ removed: true });
    }

    const item = await prisma.wishlist.create({
      data: { userId, productId },
    });

    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to update wishlist" },
      { status: 500 }
    );
  }
}
