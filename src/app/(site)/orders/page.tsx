export const dynamic = "force-dynamic";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

async function getUserOrders(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          product: { select: { name: true, slug: true, images: true } },
        },
      },
    },
  });
}

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Please Login</h1>
        <Link href="/login" className="text-blue-600 hover:underline">
          Login to view your orders
        </Link>
      </div>
    );
  }

  const orders = await getUserOrders((session.user as any).id);

  if (!orders.length) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">No Orders Yet</h1>
        <Link
          href="/shop"
          className="inline-block px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/orders/${order.id}`}
            className="block p-6 border rounded-xl hover:shadow-sm transition"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-bold">{order.orderNumber}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString("en-PK")}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {ORDER_STATUS_LABELS[order.status] || order.status}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {order.items.slice(0, 3).map((item) => (
                <img
                  key={item.id}
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-12 h-12 object-cover rounded"
                />
              ))}
              {order.items.length > 3 && (
                <span className="text-sm text-gray-500">
                  +{order.items.length - 3}
                </span>
              )}
            </div>
            <div className="flex justify-between items-center mt-3">
              <p className="text-sm text-gray-500">
                {order.items.length} item(s)
              </p>
              <p className="font-bold">{formatPrice(order.total)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
