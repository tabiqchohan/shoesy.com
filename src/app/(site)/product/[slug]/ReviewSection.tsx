"use client";

import { useState } from "react";
import type { Review } from "@prisma/client";

export default function ReviewSection({
  productId,
  initialReviews,
}: {
  productId: string;
  initialReviews?: Review[];
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState(initialReviews || []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/products/${productId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comment }),
    });
    if (res.ok) {
      const newReview = await res.json();
      setReviews((prev) => [newReview, ...prev]);
      setRating(0);
      setComment("");
    }
  }

  return (
    <section className="mt-16 border-t pt-8">
      <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>

      <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-semibold mb-4">Write a Review</h3>
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i + 1)}
              className={`w-8 h-8 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
            >
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full px-4 py-3 border rounded-lg mb-4"
          rows={3}
        />
        <button
          type="submit"
          disabled={!rating}
          className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300"
        >
          Submit Review
        </button>
      </form>

      <div className="space-y-4">
        {reviews.map((review: any) => (
          <div key={review.id} className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">{review.user?.name || "Anonymous"}</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            {review.comment && <p className="text-gray-600">{review.comment}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
