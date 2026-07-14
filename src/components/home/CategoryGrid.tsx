import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function CategoryGrid() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        take: 1,
        select: { images: true },
        orderBy: { createdAt: "desc" },
      },
      _count: { select: { products: true } },
    },
  });

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
              {cat.products[0]?.images[0] && (
                <img
                  src={cat.products[0].images[0]}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                <p className="text-sm text-gray-300">{cat._count.products}+ Products</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
