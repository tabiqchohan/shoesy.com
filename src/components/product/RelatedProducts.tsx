import prisma from "@/lib/prisma";
import ProductGrid from "./ProductGrid";

export default async function RelatedProducts({
  categoryId,
  currentProductId,
}: {
  categoryId: string;
  currentProductId: string;
}) {
  let products: any[] = [];

  try {
    products = await prisma.product.findMany({
      where: { categoryId, id: { not: currentProductId } },
      take: 4,
      include: {
        category: { select: { name: true, slug: true } },
        reviews: { select: { rating: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch {}

  if (!products.length) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Related Products</h2>
      <ProductGrid products={products} />
    </section>
  );
}
