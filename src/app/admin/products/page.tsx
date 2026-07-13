import Link from "next/link";
import prisma from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
        >
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Stock</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {product.images[0] && (
                      <img
                        src={product.images[0]}
                        alt=""
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-500">{product.category?.name}</td>
                <td className="p-4">
                  {product.salePrice ? (
                    <span>
                      {formatPrice(product.salePrice)}{" "}
                      <span className="text-gray-400 line-through text-xs">
                        {formatPrice(product.price)}
                      </span>
                    </span>
                  ) : (
                    formatPrice(product.price)
                  )}
                </td>
                <td className="p-4">
                  <span
                    className={`${
                      product.stock > 10
                        ? "text-green-600"
                        : product.stock > 0
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="p-4">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
