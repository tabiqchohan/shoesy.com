import ProductGrid from "@/components/product/ProductGrid";

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_BASE_URL
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
    || "http://localhost:3000";
}

async function getProducts() {
  const baseUrl = getBaseUrl();

  try {
    const res = await fetch(`${baseUrl}/api/products/featured`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (data.length > 0) return data;
    }
  } catch {}

  try {
    const res = await fetch(`${baseUrl}/api/products?sort=newest&limit=8`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      return data.products || [];
    }
  } catch {}

  return [];
}

export default async function FeaturedProducts() {
  const products = await getProducts();

  if (!products.length) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-500 mt-1">Handpicked favorites just for you</p>
          </div>
        </div>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
