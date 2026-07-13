"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(`/api/products/${id}`).then((r) => r.json()),
      fetch("/api/categories").then((r) => r.json()),
    ])
      .then(([product, cats]) => {
        setCategories(cats);
        setImages(product.images || []);
        setForm({
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          salePrice: product.salePrice?.toString() || "",
          sizes: product.sizes.join(", "),
          colors: product.colors.join(", "),
          stock: product.stock.toString(),
          categoryId: product.categoryId,
          featured: product.featured,
          isNew: product.isNew,
        });
      })
      .catch(() => setError("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;
  if (!form) return <div className="p-8 text-center text-red-500">Product not found</div>;

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.secure_url) {
        setImages((prev) => [...prev, data.secure_url]);
      }
    } catch {
      setError("Image upload failed. Check Cloudinary credentials.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        images,
        price: parseFloat(form.price),
        salePrice: form.salePrice ? parseFloat(form.salePrice) : null,
        stock: parseInt(form.stock),
        sizes: form.sizes.split(",").map((s: string) => s.trim()).filter(Boolean),
        colors: form.colors.split(",").map((c: string) => c.trim()).filter(Boolean),
      }),
    });

    setSubmitting(false);

    if (res.ok) {
      router.push("/admin/products");
    } else {
      const data = await res.json();
      setError(data.error || "Failed to update");
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-900">&larr; Back</button>
        <h1 className="text-2xl font-bold">Edit Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-lg">Basic Information</h2>

          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
              rows={4}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price (Rs.)</label>
              <input
                type="number"
                step="0.01"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sale Price</label>
              <input
                type="number"
                step="0.01"
                value={form.salePrice}
                onChange={(e) => setForm({ ...form, salePrice: e.target.value })}
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-lg">Variants</h2>

          <div>
            <label className="block text-sm font-medium mb-3">Sizes (click to select multiple)</label>
            <div className="flex flex-wrap gap-2">
              {["6", "7", "8", "9", "10", "11", "12", "13"].map((size: string) => {
                const selected = form.sizes.split(",").map((s: string) => s.trim()).includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      const current = form.sizes.split(",").map((s: string) => s.trim()).filter(Boolean);
                      const updated = selected
                        ? current.filter((s: string) => s !== size)
                        : [...current, size];
                      setForm({ ...form, sizes: updated.join(", ") });
                    }}
                    className={`w-12 h-10 rounded-lg text-sm font-medium border transition ${
                      selected
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-900"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Colors (click to select multiple)</label>
            <div className="flex flex-wrap gap-2">
              {["Black", "White", "Brown", "Blue", "Red", "Green", "Gray", "Navy", "Beige", "Pink"].map((color: string) => {
                const selected = form.colors.split(",").map((c: string) => c.trim()).includes(color);
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                      const current = form.colors.split(",").map((c: string) => c.trim()).filter(Boolean);
                      const updated = selected
                        ? current.filter((c: string) => c !== color)
                        : [...current, color];
                      setForm({ ...form, colors: updated.join(", ") });
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition flex items-center gap-2 ${
                      selected
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-900"
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full border`}
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                    {color}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-lg">Inventory & Category</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Stock</label>
              <input
                type="number"
                required
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-4 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4" />
              <span className="text-sm">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isNew} onChange={(e) => setForm({ ...form, isNew: e.target.checked })} className="w-4 h-4" />
              <span className="text-sm">New Arrival</span>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-lg">Images</h2>

          <div>
            <label className="block text-sm font-medium mb-2">Upload Product Images</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full text-sm"
            />
            {images.length > 0 && (
              <div className="flex gap-3 mt-3 flex-wrap">
                {images.map((url, i) => (
                  <div key={i} className="relative">
                    <img src={url} alt="" className="w-20 h-20 object-cover rounded-lg border" />
                    <button
                      type="button"
                      onClick={() => setImages((prev) => prev.filter((_, j) => j !== i))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

        <div className="flex gap-4">
          <button type="submit" disabled={submitting} className="px-8 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400 transition">
            {submitting ? "Updating..." : "Update Product"}
          </button>
          <button type="button" onClick={() => router.push("/admin/products")} className="px-8 py-3 border rounded-lg font-semibold hover:bg-gray-50 transition">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
