"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { Grid3X3 as CatalogIcon, ShoppingCart, UserRound } from "lucide-react";
import { useCart } from "@/context/cart-context";

function IconLink({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      title={title}
      aria-label={title}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/20 transition"
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const { data: session, status } = useSession();
  const { items } = useCart();
  const loading = status === "loading";
  const user = session?.user;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="w-full flex items-center justify-between px-6 py-3">
        {/* Brand */}
        <Link href="/" className="font-bold tracking-tight text-lg text-white">
          RadiShop
        </Link>

        {/* Right */}
        <div className="flex items-center gap-4">
          <IconLink href="/catalog" title="Catalog">
            <CatalogIcon className="h-7 w-7" />
          </IconLink>

          <IconLink href="/cart" title="Cart">
            <ShoppingCart className="h-7 w-7" />
            {items.length > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                {items.reduce((sum, i) => sum + i.qty, 0)}
              </span>
            )}
          </IconLink>

          {loading ? (
            <div className="h-11 w-11 animate-pulse rounded-full bg-white/10" />
          ) : user ? (
            <>
              <Link
                href="/account"
                title="Account"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition overflow-hidden"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name ?? "Account"}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover"
                    unoptimized
                  />
                ) : (
                  <UserRound className="h-7 w-7 text-white/80" />
                )}
              </Link>
              <button
                onClick={() => signOut()}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 hover:border-white/20 transition"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 hover:border-white/20 transition"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
