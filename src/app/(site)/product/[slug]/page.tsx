import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductDetailContent from "./ProductDetailContent";
import RelatedProducts from "@/components/product/RelatedProducts";
import type { ProductType } from "@/types";

async function getProduct(slug: string): Promise<ProductType | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/products/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
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
      <RelatedProducts
        categoryId={product.categoryId}
        currentProductId={product.id}
      />
    </div>
  );
}
