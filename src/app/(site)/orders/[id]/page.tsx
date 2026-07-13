export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import Link from "next/link";

async function getOrder(id: string) {
  try {
    return prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: { select: { name: true, slug: true, images: true } },
          },
        },
        statusLogs: { orderBy: { createdAt: "desc" } },
      },
    });
  } catch {
    return null;
  }
}

export default async function OrderDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const order = await getOrder(id);

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <Link href="/orders" className="text-blue-600 hover:underline">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/orders" className="text-gray-500 hover:text-gray-900 mb-4 inline-block">
        &larr; Back to Orders
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{order.orderNumber}</h1>
          <p className="text-gray-500">
            {new Date(order.createdAt).toLocaleDateString("en-PK", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <span
          className={`px-4 py-2 rounded-full font-medium ${
            order.status === "delivered"
              ? "bg-green-100 text-green-700"
              : order.status === "cancelled"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {ORDER_STATUS_LABELS[order.status]}
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="border rounded-xl p-6">
            <h2 className="font-bold mb-4">Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="font-medium hover:underline"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-gray-500">
                      Size: {item.size} × Qty: {item.quantity}
                    </p>
                    <p className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border rounded-xl p-6">
            <h2 className="font-bold mb-4">Delivery Address</h2>
            <p>{order.customerName}</p>
            <p>{order.phone}</p>
            <p>{order.address}</p>
            <p>{order.city}</p>
            {order.notes && (
              <p className="text-gray-500 mt-2">Note: {order.notes}</p>
            )}
          </div>

          <div className="border rounded-xl p-6">
            <h2 className="font-bold mb-4">Status Timeline</h2>
            <div className="space-y-3">
              {order.statusLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-gray-900 flex-shrink-0" />
                  <div>
                    <p className="font-medium">
                      {ORDER_STATUS_LABELS[log.status]}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(log.createdAt).toLocaleString("en-PK")}
                    </p>
                    {log.note && (
                      <p className="text-sm text-gray-500">{log.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="border rounded-xl p-6 sticky top-24">
            <h2 className="font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery</span>
                <span>
                  {order.deliveryFee === 0 ? "Free" : formatPrice(order.deliveryFee)}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="border-t pt-3 flex justify-between font-bold text-base">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm">
              <p className="font-medium">Payment: Cash on Delivery</p>
              <p className="text-gray-500">Pay when you receive your order</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
