import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { ProductType } from "@/types";
import WishlistButton from "./WishlistButton";

export default function ProductCard({ product }: { product: ProductType }) {
  const avgRating = product.reviews?.length
    ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
    : 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden card-hover"
    >
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {product.images?.[0] && (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500 ease-out"
          />
        )}
        {product.images?.[1] && (
          <img
            src={product.images[1]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-500 ease-out"
          />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition" />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.salePrice && (
            <span className="badge bg-red-500 text-white">SALE</span>
          )}
          {product.isNew && (
            <span className="badge bg-gray-900 text-white">NEW</span>
          )}
        </div>
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="text-white font-semibold text-sm">Out of Stock</span>
          </div>
        )}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition duration-300">
          <WishlistButton productId={product.id} />
        </div>
      </div>
      <div className="p-4">
        <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1.5">
          {product.category?.name}
        </p>
        <h3 className="font-semibold text-gray-900 mb-2 truncate text-sm leading-snug">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-3 h-3 ${i < Math.round(avgRating) ? "text-amber-400" : "text-gray-200"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          {product.reviews?.length > 0 && (
            <span className="text-[11px] text-gray-400 ml-1">({product.reviews.length})</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {product.salePrice ? (
            <>
              <span className="text-base font-bold text-gray-900">
                {formatPrice(product.salePrice)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-base font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
