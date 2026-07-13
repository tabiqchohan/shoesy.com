"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import type { ProductType } from "@/types";

export default function ProductDetailContent({
  product,
}: {
  product: ProductType;
}) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  function handleAddToCart() {
    if (!selectedSize) return;
    addItem({
      id: "",
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      salePrice: product.salePrice,
      image: product.images[0] || "",
      size: selectedSize,
      color: selectedColor,
      quantity,
      stock: product.stock,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="grid md:grid-cols-2 gap-12">
      <div>
        <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
          {product.images[selectedImage] && (
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        {product.images.length > 1 && (
          <div className="flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                  selectedImage === i ? "border-gray-900" : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className="text-sm text-gray-500 uppercase mb-2">
          {product.category?.name}
        </p>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

        <div className="flex items-baseline gap-3 mb-6">
          {product.salePrice ? (
            <>
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.salePrice)}
              </span>
              <span className="text-xl text-gray-400 line-through">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-red-500 font-semibold">
                {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
              </span>
            </>
          ) : (
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <p className="text-gray-600 mb-8">{product.description}</p>

        {product.colors.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Color: {selectedColor}</h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded-lg text-sm transition ${
                    selectedColor === color
                      ? "bg-gray-900 text-white border-gray-900"
                      : "hover:border-gray-900"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Size: {selectedSize}</h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                disabled={product.stock <= 0}
                className={`w-14 h-10 flex items-center justify-center border rounded-lg text-sm transition ${
                  selectedSize === size
                    ? "bg-gray-900 text-white border-gray-900"
                    : "hover:border-gray-900"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {size}
              </button>
            ))}
          </div>
          <a href="/size-guide" className="text-sm text-blue-600 hover:underline mt-2 inline-block">
            Size Guide
          </a>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 hover:bg-gray-100"
            >
              -
            </button>
            <span className="px-4 py-2 font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="px-3 py-2 hover:bg-gray-100"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize || product.stock <= 0}
            className={`flex-1 py-3 rounded-lg font-semibold transition ${
              added
                ? "bg-green-500 text-white"
                : "bg-gray-900 text-white hover:bg-gray-800"
            } disabled:bg-gray-300 disabled:cursor-not-allowed`}
          >
            {added ? "Added to Cart!" : product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Cash on Delivery Available
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Free Delivery on Orders Over Rs. 2,000
          </div>
        </div>
      </div>
    </div>
  );
}
