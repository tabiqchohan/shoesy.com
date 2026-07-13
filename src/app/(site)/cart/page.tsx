"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, calculateDeliveryFee } from "@/lib/utils";
import { FREE_SHIPPING_MIN } from "@/lib/constants";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();
  const deliveryFee = calculateDeliveryFee(subtotal);
  const total = subtotal + deliveryFee;

  if (!items.length) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Start shopping to add items to your cart.</p>
        <Link
          href="/shop"
          className="inline-block px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {subtotal < FREE_SHIPPING_MIN && subtotal > 0 && (
        <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-lg mb-6 text-sm">
          Add {formatPrice(FREE_SHIPPING_MIN - subtotal)} more for free delivery!
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 border rounded-xl"
            >
              <Link href={`/product/${item.slug}`} className="w-24 h-24 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </Link>
              <div className="flex-1">
                <Link
                  href={`/product/${item.slug}`}
                  className="font-semibold hover:underline"
                >
                  {item.name}
                </Link>
                <p className="text-sm text-gray-500">
                  Size: {item.size} {item.color ? `| Color: ${item.color}` : ""}
                </p>
                <p className="font-bold mt-1">
                  {formatPrice((item.salePrice || item.price) * item.quantity)}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-1">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border rounded-xl p-6 h-fit">
          <h2 className="font-bold text-lg mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Delivery</span>
              <span>
                {deliveryFee === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  formatPrice(deliveryFee)
                )}
              </span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-base">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <Link
            href="/checkout"
            className="block w-full mt-6 py-3 bg-gray-900 text-white text-center rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/shop"
            className="block w-full mt-2 py-3 text-center text-gray-600 hover:text-gray-900 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
