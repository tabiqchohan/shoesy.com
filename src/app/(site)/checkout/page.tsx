"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, calculateDeliveryFee } from "@/lib/utils";
import { FREE_SHIPPING_MIN } from "@/lib/constants";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { items, getSubtotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();
  const deliveryFee = calculateDeliveryFee(subtotal);
  const total = subtotal + deliveryFee;

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (status === "loading") {
    return <div className="max-w-3xl mx-auto px-4 py-20 text-center">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Login Required</h1>
        <p className="text-gray-500 mb-8">Please sign in to proceed with your order.</p>
        <Link
          href={`/login?callbackUrl=${encodeURIComponent("/checkout")}`}
          className="inline-block px-8 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Sign In
        </Link>
        <p className="mt-4">
          <Link href="/register" className="text-blue-600 hover:underline">Create an account</Link>
        </p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Cart is Empty</h1>
        <Link href="/shop" className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            price: item.salePrice || item.price,
          })),
          subtotal,
          deliveryFee,
          total,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      const order = await res.json();
      clearCart();
      router.push(`/orders/${order.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-5 gap-8">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-3 space-y-5"
        >
          <div>
            <h2 className="text-lg font-semibold mb-1">Delivery Details</h2>
            <p className="text-sm text-gray-500">Fill in your shipping information</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Full Name *</label>
            <input
              type="text"
              required
              value={form.customerName}
              onChange={(e) => updateField("customerName", e.target.value)}
              className="input-field"
              placeholder="John Doe"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Phone *</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="input-field"
                placeholder="03XX-XXXXXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">City *</label>
              <input
                type="text"
                required
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
                className="input-field"
                placeholder="Karachi"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Email (optional)
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="input-field"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Full Address *
            </label>
            <textarea
              required
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              className="input-field"
              rows={2}
              placeholder="House #, Street, Area"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Order Notes (optional)
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              className="input-field"
              rows={2}
              placeholder="Any special instructions?"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {error}
            </p>
          )}

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-sm">Cash on Delivery</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Pay when you receive your order — no advance payment needed
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition text-sm"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Placing Order...
              </span>
            ) : "Place Order (Pay on Delivery)"}
          </button>
        </form>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-24 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 max-h-72 overflow-y-auto mb-4 -mx-2 px-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-sm">
                    <p className="font-medium text-gray-900 truncate">{item.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      Size: {item.size}{item.color ? `, Color: ${item.color}` : ""}
                    </p>
                    <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                    <p className="font-medium text-gray-900 mt-1">
                      {formatPrice((item.salePrice || item.price) * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery</span>
                <span className={deliveryFee === 0 ? "text-emerald-600 font-medium" : "font-medium"}>
                  {deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}
                </span>
              </div>
              {deliveryFee > 0 && subtotal < FREE_SHIPPING_MIN && (
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Add {formatPrice(FREE_SHIPPING_MIN - subtotal)} for free delivery
                </p>
              )}
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-base">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center">
              By placing this order, you agree to our{" "}
              <a href="/terms" className="underline hover:text-gray-900">terms</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
