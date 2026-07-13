import Link from "next/link";

const categories = [
  { name: "Men", slug: "men", image: "/images/men.jpg", count: "120+" },
  { name: "Women", slug: "women", image: "/images/women.jpg", count: "150+" },
  { name: "Kids", slug: "kids", image: "/images/kids.jpg", count: "80+" },
  { name: "Sports", slug: "sports", image: "/images/sports.jpg", count: "60+" },
];

export default function CategoryGrid() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="group relative h-64 rounded-xl overflow-hidden bg-gray-200"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                <p className="text-sm text-gray-300">{cat.count} Products</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
