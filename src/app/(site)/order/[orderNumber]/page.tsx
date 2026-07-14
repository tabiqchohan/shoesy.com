import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;

  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      items: {
        include: {
          product: { select: { name: true, slug: true, images: true } },
        },
      },
      statusLogs: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!order) notFound();

  const statusColor: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    processing: "bg-indigo-100 text-indigo-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/profile/orders" className="text-gray-500 hover:text-gray-900 transition">&larr; Back to Orders</Link>
        <h1 className="text-3xl font-bold">Order #{order.orderNumber}</h1>
      </div>

      <div className="bg-white rounded-xl border p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">Status</span>
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${statusColor[order.status] || "bg-gray-100 text-gray-700"}`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Customer</span>
            <p className="font-medium">{order.customerName}</p>
          </div>
          <div>
            <span className="text-gray-500">Phone</span>
            <p className="font-medium">{order.phone}</p>
          </div>
          <div className="col-span-2">
            <span className="text-gray-500">Address</span>
            <p className="font-medium">{order.address}, {order.city}</p>
          </div>
          <div>
            <span className="text-gray-500">Date</span>
            <p className="font-medium">{new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
          {order.estimatedDelivery && <div>
            <span className="text-gray-500">Est. Delivery</span>
            <p className="font-medium">{order.estimatedDelivery}</p>
          </div>}
        </div>
      </div>

      <div className="bg-white rounded-xl border p-6 mb-6">
        <h2 className="font-semibold mb-4">Items</h2>
        <div className="divide-y">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-3">
              {item.product.images?.[0] && (
                <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg" />
              )}
              <div className="flex-1">
                <p className="font-medium text-sm">{item.product.name}</p>
                <p className="text-xs text-gray-500">Size: {item.size}{item.color ? `, Color: ${item.color}` : ""}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{formatPrice(item.price)}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border p-6">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Delivery Fee</span>
            <span>{formatPrice(order.deliveryFee)}</span>
          </div>
          {order.discount > 0 && <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-{formatPrice(order.discount)}</span>
          </div>}
          <div className="flex justify-between font-semibold text-base pt-2 border-t">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Payment: Cash on Delivery</p>
        </div>
      </div>

      {order.statusLogs.length > 0 && (
        <div className="bg-white rounded-xl border p-6 mt-6">
          <h2 className="font-semibold mb-4">Status Updates</h2>
          <div className="space-y-3">
            {order.statusLogs.map((log) => (
              <div key={log.id} className="flex gap-3 text-sm">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-gray-900 flex-shrink-0" />
                <div>
                  <p className="font-medium">{log.status.charAt(0).toUpperCase() + log.status.slice(1)}</p>
                  {log.note && <p className="text-gray-500 text-xs">{log.note}</p>}
                  <p className="text-gray-400 text-xs">{new Date(log.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
