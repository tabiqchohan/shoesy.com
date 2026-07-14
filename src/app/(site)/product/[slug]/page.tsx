import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductDetailContent from "./ProductDetailContent";
import ReviewSection from "./ReviewSection";
import RelatedProducts from "@/components/product/RelatedProducts";
import prisma from "@/lib/prisma";
import type { ProductType } from "@/types";

async function getProduct(slug: string): Promise<ProductType | null> {
  try {
    const product = await prisma.product.findFirst({
      where: { OR: [{ slug }, { id: slug }] },
      include: {
        category: { select: { name: true, slug: true } },
        reviews: {
          select: { id: true, rating: true, comment: true, createdAt: true, user: { select: { name: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
    });
    return product as unknown as ProductType | null;
  } catch {
    return null;
  }
}

export default async function ProductPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-500">The product you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Shop", href: "/shop" },
          { label: product.category?.name, href: `/shop?category=${product.category?.slug}` },
          { label: product.name },
        ]}
      />
      <ProductDetailContent product={product} />
      <ReviewSection productId={product.id} initialReviews={product.reviews as any} />
      <RelatedProducts
        categoryId={product.categoryId}
        currentProductId={product.id}
      />
    </div>
  );
}
