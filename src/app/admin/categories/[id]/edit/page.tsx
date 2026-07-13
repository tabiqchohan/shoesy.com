"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // Edit functionality
    router.push("/admin/categories");
  }

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-8">Edit Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
