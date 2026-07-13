export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">About Shoesy</h1>

      <div className="prose max-w-none space-y-6 text-gray-600">
        <p>
          Welcome to <strong>Shoesy</strong> — your premier destination for stylish,
          comfortable, and affordable footwear. We believe that the right pair of
          shoes can transform your day, and we&apos;re here to help you find the
          perfect fit.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">Our Mission</h2>
        <p>
          To provide high-quality footwear at accessible prices, with the
          convenience of cash-on-delivery across Pakistan. We curate the latest
          trends in men&apos;s, women&apos;s, and kids&apos; footwear so you can
          shop the best styles from the comfort of your home.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">Why Shop With Us?</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Cash on Delivery</strong> — Pay only when you receive</li>
          <li><strong>Free Delivery</strong> — On orders over Rs. 2,000</li>
          <li><strong>Premium Quality</strong> — 100% authentic products</li>
          <li><strong>Easy Exchange</strong> — 7-day exchange policy</li>
          <li><strong>Wide Selection</strong> — From casual to formal, sports to sandals</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900">Our Promise</h2>
        <p>
          Every pair of shoes we sell is carefully selected for quality and comfort.
          We work directly with trusted manufacturers and brands to bring you the
          best value for your money. Your satisfaction is our top priority.
        </p>
      </div>
    </div>
  );
}
