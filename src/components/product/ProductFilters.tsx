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
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => updateFilter("category", cat.slug)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                currentCategory === cat.slug
                  ? "bg-gray-900 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Sort By</h3>
        <div className="space-y-2">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateFilter("sort", opt.value)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                searchParams.sort === opt.value
                  ? "bg-gray-900 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {opt.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Size</h3>
        <div className="grid grid-cols-3 gap-2">
          {SHOE_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => updateFilter("size", size)}
              className={`px-3 py-2 text-sm border rounded-lg transition ${
                searchParams.size === size
                  ? "bg-gray-900 text-white border-gray-900"
                  : "hover:border-gray-900"
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
