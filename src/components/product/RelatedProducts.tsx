import ProductGrid from "./ProductGrid";

async function getRelatedProducts(
  categoryId: string,
  currentProductId: string
) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(
      `${baseUrl}/api/products?category=${categoryId}&exclude=${currentProductId}&limit=4`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.products || [];
  } catch {
    return [];
  }
}

export default async function RelatedProducts({
  categoryId,
  currentProductId,
}: {
  categoryId: string;
  currentProductId: string;
}) {
  const products = await getRelatedProducts(categoryId, currentProductId);

  if (!products.length) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Related Products</h2>
      <ProductGrid products={products} />
    </section>
  );
}
