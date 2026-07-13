"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUS_LABELS } from "@/lib/constants";

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/orders/${id}`)
      .then((res) => res.json())
      .then(setOrder)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  async function updateStatus(status: string) {
    const note = prompt("Add a note (optional):");
    const res = await fetch(`/api/admin/orders/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, note }),
    });
    if (res.ok) {
      const updated = await res.json();
      setOrder(updated);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (!order) return <div>Order not found</div>;

  const nextStatuses: Record<string, string[]> = {
    pending: ["confirmed", "cancelled"],
    confirmed: ["shipped", "cancelled"],
    shipped: ["delivered"],
    delivered: [],
    cancelled: [],
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Order {order.orderNumber}</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-bold mb-4">Items</h2>
            {order.items?.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center gap-4 py-3 border-b last:border-0"
              >
                <img
                  src={item.product?.images?.[0] || ""}
                  alt=""
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.product?.name}</p>
                  <p className="text-sm text-gray-500">
                    Size: {item.size} × Qty: {item.quantity}
                  </p>
                  <p className="font-medium">{formatPrice(item.price)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-bold mb-4">Customer Details</h2>
            <p><strong>Name:</strong> {order.customerName}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>City:</strong> {order.city}</p>
            <p><strong>Address:</strong> {order.address}</p>
            {order.notes && <p><strong>Notes:</strong> {order.notes}</p>}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-bold mb-4">Status Timeline</h2>
            <div className="space-y-3">
              {order.statusLogs?.map((log: any) => (
                <div key={log.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-gray-900" />
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

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-bold mb-4">Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{order.deliveryFee === 0 ? "Free" : formatPrice(order.deliveryFee)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500">COD - Cash on Delivery</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-bold mb-4">Update Status</h2>
            <div className="space-y-2">
              {(nextStatuses[order.status] || []).map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(status)}
                  className="w-full py-2 rounded-lg text-sm font-medium transition bg-gray-900 text-white hover:bg-gray-800"
                >
                  Mark as {ORDER_STATUS_LABELS[status]}
                </button>
              ))}
              {nextStatuses[order.status]?.length === 0 && (
                <p className="text-gray-500 text-sm">No further updates</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
