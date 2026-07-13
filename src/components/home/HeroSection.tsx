import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Step Into Style
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Discover the latest collection of premium footwear. Comfort meets fashion.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Shop Now
            </Link>
            <Link
              href="/shop?category=men"
              className="px-8 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition"
            >
              Men&apos;s Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
