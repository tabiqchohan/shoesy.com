import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { reviewSchema } from "@/lib/validations";

export async function POST(
  req: Request,
  ctx: RouteContext<"/api/products/[slug]/reviews">
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await ctx.params;
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const body = await req.json();
    const validated = reviewSchema.parse(body);

    const review = await prisma.review.create({
      data: {
        userId: (session.user as any).id,
        productId: product.id,
        rating: validated.rating,
        comment: validated.comment || null,
      },
      include: { user: { select: { name: true } } },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to submit review" },
      { status: 400 }
    );
  }
}
