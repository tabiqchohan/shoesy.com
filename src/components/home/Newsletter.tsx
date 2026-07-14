"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="relative max-w-2xl mx-auto px-4 text-center">
        <span className="text-xs font-semibold text-gray-500 tracking-[0.2em] uppercase">Stay Connected</span>
        <h2 className="section-title text-white mt-3 mb-4">Join the Shoesy Family</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
          Subscribe to get exclusive offers, new arrivals, and style inspiration straight to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
          <div className="flex-1 relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/15 transition text-sm"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition text-sm whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
        {status === "success" && (
          <p className="mt-4 text-emerald-400 text-sm flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Thanks for subscribing!
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-400 text-sm">Something went wrong. Try again.</p>
        )}
      </div>
    </section>
  );
}
