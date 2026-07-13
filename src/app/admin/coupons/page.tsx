import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function AdminCouponsPage() {
  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Coupons</h1>
        <Link
          href="/admin/coupons/new"
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
        >
          Add Coupon
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="p-4 font-medium">Code</th>
              <th className="p-4 font-medium">Discount</th>
              <th className="p-4 font-medium">Type</th>
              <th className="p-4 font-medium">Used</th>
              <th className="p-4 font-medium">Expires</th>
              <th className="p-4 font-medium">Active</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="border-b">
                <td className="p-4 font-medium">{coupon.code}</td>
                <td className="p-4">
                  {coupon.type === "percentage"
                    ? `${coupon.discount}%`
                    : `Rs. ${coupon.discount}`}
                </td>
                <td className="p-4 text-gray-500">{coupon.type}</td>
                <td className="p-4">
                  {coupon.usedCount}/{coupon.maxUses || "∞"}
                </td>
                <td className="p-4">
                  {coupon.expiresAt
                    ? new Date(coupon.expiresAt).toLocaleDateString("en-PK")
                    : "Never"}
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      coupon.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {coupon.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
