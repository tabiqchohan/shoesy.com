import ProductCard from "./ProductCard";
import type { ProductType } from "@/types";

export default function ProductGrid({
  products,
}: {
  products: ProductType[];
}) {
  if (!products.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
