import prisma from "@/lib/prisma";
import ProductGrid from "@/components/product/ProductGrid";

async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { featured: true, stock: { gt: 0 } },
      take: 8,
      include: {
        category: { select: { name: true, slug: true } },
        reviews: { select: { rating: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    if (products.length > 0) return products;
  } catch {}

  try {
    const products = await prisma.product.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: {
        category: { select: { name: true, slug: true } },
        reviews: { select: { rating: true } },
      },
    });

    return products;
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
