import prisma from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

async function getStats() {
  const [
    totalOrders,
    totalProducts,
    totalCustomers,
    totalRevenue,
    recentOrders,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.product.count(),
    prisma.user.count({ where: { role: "customer" } }),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: "delivered" },
    }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { items: true },
    }),
  ]);

  return {
    totalOrders,
    totalProducts,
    totalCustomers,
    totalRevenue: totalRevenue._sum.total || 0,
    recentOrders,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const cards = [
    { label: "Total Orders", value: stats.totalOrders, color: "bg-blue-500" },
    { label: "Total Products", value: stats.totalProducts, color: "bg-green-500" },
    { label: "Total Customers", value: stats.totalCustomers, color: "bg-purple-500" },
    {
      label: "Revenue (Delivered)",
      value: formatPrice(stats.totalRevenue),
      color: "bg-orange-500",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-6 shadow-sm">
            <div className={`w-12 h-12 ${card.color} rounded-lg mb-4`} />
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="font-bold text-lg mb-4">Recent Orders</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="pb-3 font-medium">Order</th>
              <th className="pb-3 font-medium">Customer</th>
              <th className="pb-3 font-medium">Total</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentOrders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="py-3">{order.orderNumber}</td>
                <td className="py-3">{order.customerName}</td>
                <td className="py-3">{formatPrice(order.total)}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3">
                  {new Date(order.createdAt).toLocaleDateString("en-PK")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
