"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

type Order = {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
  items: { quantity: number; product: { name: string } }[];
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/profile");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/orders/mine")
        .then((res) => res.json())
        .then((data) => {
          setOrders(Array.isArray(data) ? data : []);
          setLoadingOrders(false);
        })
        .catch(() => setLoadingOrders(false));
    }
  }, [status]);

  if (status === "loading") {
    return <div className="max-w-3xl mx-auto px-4 py-20 text-center">Loading...</div>;
  }

  if (!session) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl border p-6">
            <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              {session.user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <h2 className="text-lg font-semibold text-center">{session.user?.name}</h2>
            <p className="text-sm text-gray-500 text-center">{session.user?.email}</p>
            <p className="text-xs text-gray-400 text-center mt-1 capitalize">{(session.user as any)?.role || "customer"}</p>
            {(session.user as any)?.role === "admin" && (
              <Link
                href="/admin/dashboard"
                className="mt-4 block w-full px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition text-center"
              >
                Admin Panel
              </Link>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">My Orders</h2>
          {loadingOrders ? (
            <p className="text-gray-500">Loading orders...</p>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-xl border p-8 text-center">
              <p className="text-gray-500 mb-4">You have no orders yet.</p>
              <Link
                href="/shop"
                className="inline-block px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/order/${order.orderNumber}`}
                  className="block bg-white rounded-xl border p-5 hover:border-gray-300 transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-900">#{order.orderNumber}</span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${order.status === "delivered" ? "bg-green-100 text-green-700" : order.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? "s" : ""} &middot; {formatPrice(order.total)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
