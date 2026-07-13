"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUS_LABELS } from "@/lib/constants";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(
        `/api/orders/track?number=${encodeURIComponent(orderNumber)}&phone=${encodeURIComponent(phone)}`
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Order not found");
      }
      const data = await res.json();
      setOrder(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Track Your Order</h1>

      <form onSubmit={handleSearch} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1">Order Number</label>
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="SHO-XXXX-XXXX"
            required
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="03XX-XXXXXXX"
            required
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400"
        >
          {loading ? "Searching..." : "Track Order"}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-center">
          {error}
        </div>
      )}

      {order && (
        <div className="border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-lg">{order.orderNumber}</h2>
              <p className="text-sm text-gray-500">{order.customerName}</p>
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

          <div className="space-y-3">
            {order.statusLogs?.map((log: any) => (
              <div key={log.id} className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-gray-900 flex-shrink-0" />
                <div>
                  <p className="font-medium">{ORDER_STATUS_LABELS[log.status]}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(log.createdAt).toLocaleString("en-PK")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t mt-6 pt-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Cash on Delivery</p>
          </div>
        </div>
      )}
    </div>
  );
}
