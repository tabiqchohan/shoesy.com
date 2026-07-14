import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Pagination from "@/components/ui/Pagination";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";
import prisma from "@/lib/prisma";
import type { ProductType } from "@/types";

async function getProducts(searchParams: {
  [key: string]: string | string[] | undefined;
}): Promise<{ products: ProductType[]; totalPages: number }> {
  try {
    const category = searchParams.category as string | undefined;
    const q = searchParams.q as string | undefined;
    const sort = (searchParams.sort as string) || "newest";
    const page = parseInt((searchParams.page as string) || "1");
    const limit = 12;
    const minPrice = searchParams.minPrice as string | undefined;
    const maxPrice = searchParams.maxPrice as string | undefined;
    const size = searchParams.size as string | undefined;
    const color = searchParams.color as string | undefined;

    const where: any = {};

    if (category) {
      where.category = { slug: category };
    }

    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    if (size) {
      where.sizes = { has: size };
    }

    if (color) {
      where.colors = { has: color };
    }

    let orderBy: any = { createdAt: "desc" };
    if (sort === "price_asc") orderBy = { price: "asc" };
    if (sort === "price_desc") orderBy = { price: "desc" };
    if (sort === "name") orderBy = { name: "asc" };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          category: { select: { name: true, slug: true } },
          reviews: { select: { rating: true } },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      products: products as unknown as ProductType[],
      totalPages: Math.ceil(total / limit),
    };
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

      <div className="mb-10">
        <h1 className="section-title">
          {searchParams.q
            ? `Search: "${searchParams.q}"`
            : searchParams.category
              ? `${String(searchParams.category).charAt(0).toUpperCase() + String(searchParams.category).slice(1)} Shoes`
              : "All Shoes"}
        </h1>
        <p className="section-subtitle mt-2">
          {searchParams.q
            ? `Results for "${searchParams.q}"`
            : "Discover premium footwear crafted for style and comfort"}
        </p>
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
