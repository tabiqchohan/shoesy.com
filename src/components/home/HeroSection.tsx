import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-800/50 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-36">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            New Collection 2026
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Step Into
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Style
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-10 max-w-xl">
            Discover premium footwear crafted for comfort and designed to impress. 
            Elevate every step with our latest collection.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              Shop Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/shop?category=men"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
            >
              Explore Collection
            </Link>
          </div>
          <div className="flex items-center gap-8 mt-12 pt-8 border-t border-white/10">
            <div>
              <p className="text-2xl font-bold">500+</p>
              <p className="text-xs text-gray-500">Premium Styles</p>
            </div>
            <div>
              <p className="text-2xl font-bold">10K+</p>
              <p className="text-xs text-gray-500">Happy Customers</p>
            </div>
            <div>
              <p className="text-2xl font-bold">4.8</p>
              <p className="text-xs text-gray-500">Avg Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
