"use client";

import { useRouter } from "next/navigation";
import { SHOE_SIZES } from "@/lib/constants";

const categories = [
  { name: "All", slug: "" },
  { name: "Men", slug: "men" },
  { name: "Women", slug: "women" },
  { name: "Kids", slug: "kids" },
  { name: "Sports", slug: "sports" },
];

const sortOptions = [
  { name: "Newest", value: "newest" },
  { name: "Price: Low to High", value: "price_asc" },
  { name: "Price: High to Low", value: "price_desc" },
  { name: "Name", value: "name" },
];

export default function ProductFilters({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const router = useRouter();
  const currentCategory = (searchParams.category as string) || "";

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams();
    if (searchParams.q) params.set("q", searchParams.q as string);
    if (searchParams.page) params.set("page", searchParams.page as string);
    if (value) params.set(key, value);
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Categories</h3>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => updateFilter("category", cat.slug)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                currentCategory === cat.slug
                  ? "bg-gray-900 text-white font-medium"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Sort By</h3>
        <div className="space-y-1">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateFilter("sort", opt.value)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                (searchParams.sort || "newest") === opt.value
                  ? "bg-gray-900 text-white font-medium"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {opt.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Size</h3>
        <div className="flex flex-wrap gap-1.5">
          {SHOE_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => updateFilter("size", size)}
              className={`w-10 h-10 text-sm font-medium rounded-lg border transition ${
                searchParams.size === size
                  ? "bg-gray-900 text-white border-gray-900"
                  : "text-gray-600 border-gray-200 hover:border-gray-900 hover:text-gray-900"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
