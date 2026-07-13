import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Pagination from "@/components/ui/Pagination";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";
import type { ProductType } from "@/types";

async function getProducts(searchParams: {
  [key: string]: string | string[] | undefined;
}): Promise<{ products: ProductType[]; totalPages: number }> {
  try {
    const params = new URLSearchParams();
    if (searchParams.category) params.set("category", searchParams.category as string);
    if (searchParams.q) params.set("q", searchParams.q as string);
    if (searchParams.sort) params.set("sort", searchParams.sort as string);
    if (searchParams.page) params.set("page", searchParams.page as string);
    if (searchParams.minPrice) params.set("minPrice", searchParams.minPrice as string);
    if (searchParams.maxPrice) params.set("maxPrice", searchParams.maxPrice as string);
    if (searchParams.size) params.set("size", searchParams.size as string);
    if (searchParams.color) params.set("color", searchParams.color as string);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/products?${params.toString()}`, {
      cache: "no-store",
    });
    if (!res.ok) return { products: [], totalPages: 0 };
    return res.json();
  } catch {
    return { products: [], totalPages: 0 };
  }
}

export default async function ShopPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { products, totalPages } = await getProducts(searchParams);
  const currentPage = Number(searchParams.page) || 1;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Shop" }]} />

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          {searchParams.q
            ? `Search: "${searchParams.q}"`
            : searchParams.category
              ? `${searchParams.category} Shoes`
              : "All Shoes"}
        </h1>
      </div>

      <div className="flex gap-8">
        <aside className="hidden md:block w-64 flex-shrink-0">
          <ProductFilters searchParams={searchParams} />
        </aside>
        <div className="flex-1">
          <ProductGrid products={products} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/shop"
            searchParams={searchParams as Record<string, string>}
          />
        </div>
      </div>
    </div>
  );
}
