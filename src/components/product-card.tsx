import Image from "next/image";
import Link from "next/link";

function toPublicPath(p: string | null | undefined): string {
  if (!p) return "/placeholder.png";
  return p.startsWith("/") ? p : `/${p}`;
}

type CardProduct = {
  id: string;
  name: string;
  slug: string;
  priceCents: number;
  image?: string | null;
  images?: { url: string | null }[];
};

export default function ProductCard({ p }: { p: CardProduct }) {
  const primary = p.image ?? p.images?.[0]?.url;
  const imgSrc = toPublicPath(primary);

  return (
    <div
      className="
        group rounded-2xl border p-4 space-y-3
        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        hover:shadow-xl hover:-translate-y-1
      "
    >
      <Link href={`/product/${p.slug}`} className="block" prefetch={false}>
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-black/10 dark:bg-white/10">
          <Image
  src={imgSrc}
  alt={p.name}
  fill
  className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
  priority={false}
/>

        </div>
      </Link>

      <div className="text-sm line-clamp-1">{p.name}</div>
      <div className="text-sm text-gray-400">
        ₹{(p.priceCents / 100).toFixed(2)}
      </div>

      <Link
        href={`/product/${p.slug}`}
        prefetch={false}
        className="
          inline-flex items-center justify-center rounded-xl border px-4 py-2
          transition-colors duration-300 ease-in-out
          hover:bg-white hover:text-black
          dark:hover:bg-black dark:hover:text-white
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2
        "
      >
        View details
      </Link>
    </div>
  );
}
