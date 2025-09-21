import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  // 🔹 Only 12 products for homepage Featured
  const featured = [
    { name: "Classic Cotton Tee", img: "/seed/tee.jpg", price: 799 },
    { name: "Sporty Hoodie", img: "/seed/hoodie.jpg", price: 1599 },
    { name: "Slim Fit Chinos", img: "/seed/chinos.jpg", price: 1999 },
    { name: "Wireless Earbuds Pro", img: "/seed/earbuds.jpg", price: 3299 },
    { name: "Studio Headphones X", img: "/seed/headphones.jpg", price: 4999 },
    { name: "Portable Bluetooth Speaker", img: "/seed/speaker.jpg", price: 2999 },
    { name: "Urban Daypack", img: "/seed/backpack.jpg", price: 2199 },
    { name: "Leather Messenger Bag", img: "/seed/messenger.jpg", price: 5999 },
    { name: "Insulated Water Bottle", img: "/seed/bottle.jpg", price: 899 },
    { name: "Smartwatch Series X", img: "/seed/watch.jpg", price: 9999 },
    { name: "Cap Classic", img: "/seed/cap.jpg", price: 699 },
    { name: "Analog Watch", img: "/seed/analog-watch.jpg", price: 3499 },
  ];

  return (
    <main className="px-6 py-10 space-y-16">
      {/* Hero */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Welcome to <span className="text-emerald-500">RadiShop</span>
        </h1>
        <p className="text-gray-400 text-lg">
          A modern e-commerce demo showcasing speed, security, and a seamless
          shopping experience. Perfectly built for freelancers & portfolio
          projects.
        </p>
        <Link
          href="/catalog"
          className="inline-block mt-4 rounded-lg bg-emerald-500 px-6 py-3 text-white font-medium hover:bg-emerald-600 transition"
        >
          🚀 Shop Now
        </Link>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-xl font-semibold mb-6">Featured Products</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <div
              key={p.name}
              className="rounded-xl border p-4 hover:shadow-md transition group"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-black/10 dark:bg-white/10">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>
              <div className="mt-3 font-medium">{p.name}</div>
              <div className="text-gray-400">₹{p.price}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link
            href="/catalog"
            className="text-emerald-500 font-medium hover:underline"
          >
            View All 40 Products →
          </Link>
        </div>
      </section>
    </main>
  );
}
