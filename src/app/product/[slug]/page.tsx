// src/app/product/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

// same dataset as catalog (keep in sync or move to a shared file later)
const products = [
  { id: "1", name: "Classic Cotton Tee", slug: "classic-tee", img: "/seed/tee.jpg", priceCents: 79900 },
  { id: "2", name: "Sporty Hoodie", slug: "sporty-hoodie", img: "/seed/hoodie.jpg", priceCents: 159900 },
  { id: "3", name: "Slim Fit Chinos", slug: "slim-chinos", img: "/seed/chinos.jpg", priceCents: 199900 },
  { id: "4", name: "Casual Polo Shirt", slug: "polo-shirt", img: "/seed/polo.jpg", priceCents: 119900 },
  // ... keep the rest of your 40 items here ...
  { id: "40", name: "Analog Watch", slug: "analog-watch", img: "/seed/analog-watch.jpg", priceCents: 349900 },
];

function toPublicPath(p?: string | null) {
  if (!p) return "/placeholder.png";
  return p.startsWith("/") ? p : `/${p}`;
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <section className="space-y-6">
      <nav className="text-sm text-gray-400">
        <Link href="/catalog" className="hover:underline">
          Catalog
        </Link>
        <> / {product.name}</>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        {/* LEFT: Main Image */}
        <div className="rounded-xl overflow-hidden border bg-black/10 dark:bg-white/10">
          <div className="relative aspect-square w-full">
            <Image
              src={toPublicPath(product.img)}
              alt={product.name}
              fill
              className="object-contain p-2 bg-white dark:bg-black"
              unoptimized
              priority
            />
          </div>
        </div>

        {/* RIGHT: Info */}
        <div className="space-y-5">
          <h1 className="text-2xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-3">
            <div className="text-2xl font-semibold">₹{(product.priceCents / 100).toFixed(2)}</div>
            <span className="rounded-full px-2.5 py-0.5 text-xs border border-emerald-500 text-emerald-400">
              In stock
            </span>
          </div>

          <p className="text-gray-400 leading-relaxed">
            A reliable everyday piece made for comfort and durability.
          </p>

          <div className="pt-1 w-full md:w-auto md:min-w-[180px]">
            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                priceCents: product.priceCents,
                image: product.img,
              }}
            />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-semibold">Related products</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/product/${r.slug}`}
                className="block border rounded-xl p-3 hover:opacity-90"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg bg-black/10 dark:bg-white/10">
                  <Image
                    src={toPublicPath(r.img)}
                    alt={r.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <div className="mt-2 text-sm">{r.name}</div>
                <div className="text-sm text-gray-400">₹{(r.priceCents / 100).toFixed(2)}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
