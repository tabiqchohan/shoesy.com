const testimonials = [
  {
    name: "Ahmed Khan",
    text: "Amazing quality shoes! The delivery was on time and the fit was perfect. Highly recommended.",
    rating: 5,
    role: "Verified Buyer",
  },
  {
    name: "Fatima Ali",
    text: "Love the collection! Cash on delivery made it so easy to order. Will shop again.",
    rating: 5,
    role: "Verified Buyer",
  },
  {
    name: "Usman Raza",
    text: "Great prices and premium quality. My go-to store for footwear now.",
    rating: 4,
    role: "Verified Buyer",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold text-gray-400 tracking-[0.2em] uppercase">Testimonials</span>
          <h2 className="section-title mt-3 mb-4">What Our Customers Say</h2>
          <p className="section-subtitle max-w-lg mx-auto">
            Real reviews from real customers who love their shoes.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="relative bg-white rounded-2xl p-7 border border-gray-100 card-hover animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <svg className="absolute top-5 right-6 w-8 h-8 text-gray-100" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
              </svg>
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg
                    key={j}
                    className={`w-4 h-4 ${j < t.rating ? "text-amber-400" : "text-gray-200"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed mb-5 text-sm">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold">
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
