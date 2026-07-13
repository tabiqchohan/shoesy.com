import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { generateOrderNumber } from "@/lib/utils";
import { ESTIMATED_DELIVERY_DAYS } from "@/lib/constants";
import { checkoutSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();
    const validated = checkoutSchema.parse(body);

    if (!body.items?.length) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    const orderNumber = generateOrderNumber();

    const order = await prisma.order.create({
      data: {
        userId: (session?.user as any)?.id || null,
        orderNumber,
        customerName: validated.customerName,
        phone: validated.phone,
        address: validated.address,
        city: validated.city,
        notes: validated.notes || null,
        subtotal: body.subtotal || 0,
        deliveryFee: body.deliveryFee || 0,
        discount: body.discount || 0,
        total: body.total || 0,
        couponCode: body.couponCode || null,
        estimatedDelivery: ESTIMATED_DELIVERY_DAYS,
        status: "pending",
        items: {
          create: body.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            size: item.size,
            color: item.color || null,
            price: item.price,
          })),
        },
        statusLogs: {
          create: {
            status: "pending",
            note: "Order placed",
          },
        },
      },
      include: {
        items: true,
        statusLogs: true,
      },
    });

    if (session?.user) {
      await prisma.cartItem.deleteMany({
        where: { userId: (session.user as any).id },
      });
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to place order" },
      { status: 400 }
    );
  }
}
