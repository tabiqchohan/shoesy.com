import Link from "next/link";

export const dynamic = "force-dynamic";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
  { label: "Products", href: "/admin/products", icon: "👟" },
  { label: "Categories", href: "/admin/categories", icon: "📁" },
  { label: "Orders", href: "/admin/orders", icon: "📦" },
  { label: "Coupons", href: "/admin/coupons", icon: "🏷️" },
  { label: "Customers", href: "/admin/customers", icon: "👥" },
  { label: "Messages", href: "/admin/messages", icon: "💬" },
  { label: "Subscribers", href: "/admin/subscribers", icon: "📧" },
  { label: "Bulk Import", href: "/admin/bulk-import", icon: "📥" },
  { label: "Settings", href: "/admin/settings", icon: "⚙️" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0">
        <div className="p-6">
          <Link href="/admin/dashboard" className="text-xl font-bold">
            Shoesy Admin
          </Link>
        </div>
        <nav className="px-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition"
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="px-4 mt-8">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition"
          >
            ← Back to Site
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
