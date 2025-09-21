"use client";

import { useState } from "react";
import ProductCard from "@/components/product-card";

export default function CatalogPage() {
  // 🔹 Static 40 product dataset
  const products = [
    // Apparel
    { id: "1", name: "Classic Cotton Tee", slug: "classic-tee", img: "/seed/tee.jpg", priceCents: 79900 },
    { id: "2", name: "Sporty Hoodie", slug: "sporty-hoodie", img: "/seed/hoodie.jpg", priceCents: 159900 },
    { id: "3", name: "Slim Fit Chinos", slug: "slim-chinos", img: "/seed/chinos.jpg", priceCents: 199900 },
    { id: "4", name: "Casual Polo Shirt", slug: "polo-shirt", img: "/seed/polo.jpg", priceCents: 119900 },
    { id: "5", name: "Everyday Tee", slug: "everyday-tee", img: "/seed/tee.jpg", priceCents: 69900 },
    { id: "6", name: "Formal Shirt", slug: "formal-shirt", img: "/seed/formal.jpg", priceCents: 149900 },
    { id: "7", name: "Athletic Shorts", slug: "athletic-shorts", img: "/seed/shorts.jpg", priceCents: 99900 },
    { id: "8", name: "Winter Jacket", slug: "winter-jacket", img: "/seed/jacket.jpg", priceCents: 349900 },
    { id: "9", name: "Denim Jeans", slug: "denim-jeans", img: "/seed/jeans.jpg", priceCents: 229900 },
    { id: "10", name: "Active Track Pants", slug: "track-pants", img: "/seed/tracks.jpg", priceCents: 129900 },

    // Audio
    { id: "11", name: "Wireless Earbuds Pro", slug: "wireless-earbuds", img: "/seed/earbuds.jpg", priceCents: 329900 },
    { id: "12", name: "Studio Headphones X", slug: "studio-headphones", img: "/seed/headphones.jpg", priceCents: 499900 },
    { id: "13", name: "Portable Bluetooth Speaker", slug: "bluetooth-speaker", img: "/seed/speaker.jpg", priceCents: 299900 },
    { id: "14", name: "Gaming Headset", slug: "gaming-headset", img: "/seed/headset.jpg", priceCents: 349900 },
    { id: "15", name: "Mini Wireless Speaker", slug: "mini-speaker", img: "/seed/speaker-mini.jpg", priceCents: 199900 },
    { id: "16", name: "Over-Ear Headphones", slug: "over-ear-headphones", img: "/seed/headphones.jpg", priceCents: 399900 },
    { id: "17", name: "Noise Cancelling Earbuds", slug: "noise-cancelling-earbuds", img: "/seed/earbuds.jpg", priceCents: 359900 },
    { id: "18", name: "Smart Audio Bar", slug: "audio-bar", img: "/seed/soundbar.jpg", priceCents: 799900 },
    { id: "19", name: "Travel Earphones", slug: "travel-earphones", img: "/seed/earbuds.jpg", priceCents: 99900 },
    { id: "20", name: "DJ Headphones", slug: "dj-headphones", img: "/seed/headphones.jpg", priceCents: 699900 },

    // Bags
    { id: "21", name: "Urban Daypack", slug: "urban-daypack", img: "/seed/backpack.jpg", priceCents: 219900 },
    { id: "22", name: "Leather Messenger Bag", slug: "messenger-bag", img: "/seed/messenger.jpg", priceCents: 599900 },
    { id: "23", name: "Classic Duffel Bag", slug: "duffel-bag", img: "/seed/duffel.jpg", priceCents: 349900 },
    { id: "24", name: "Laptop Backpack", slug: "laptop-backpack", img: "/seed/backpack.jpg", priceCents: 289900 },
    { id: "25", name: "Minimalist Sling Bag", slug: "sling-bag", img: "/seed/sling.jpg", priceCents: 169900 },
    { id: "26", name: "Travel Trolley Bag", slug: "trolley-bag", img: "/seed/trolley.jpg", priceCents: 799900 },
    { id: "27", name: "Sport Gym Bag", slug: "gym-bag", img: "/seed/gym.jpg", priceCents: 189900 },
    { id: "28", name: "Mini Backpack", slug: "mini-backpack", img: "/seed/backpack-mini.jpg", priceCents: 149900 },
    { id: "29", name: "Hiking Rucksack", slug: "rucksack", img: "/seed/rucksack.jpg", priceCents: 459900 },
    { id: "30", name: "Office Tote Bag", slug: "tote-bag", img: "/seed/tote.jpg", priceCents: 259900 },

    // Accessories
    { id: "31", name: "Insulated Water Bottle", slug: "insulated-bottle", img: "/seed/bottle.jpg", priceCents: 89900 },
    { id: "32", name: "Stainless Steel Bottle", slug: "steel-bottle", img: "/seed/bottle.jpg", priceCents: 99900 },
    { id: "33", name: "Smartwatch Series X", slug: "smartwatch-x", img: "/seed/watch.jpg", priceCents: 999900 },
    { id: "34", name: "Fitness Band", slug: "fitness-band", img: "/seed/band.jpg", priceCents: 299900 },
    { id: "35", name: "Sunglasses Classic", slug: "sunglasses", img: "/seed/sunglasses.jpg", priceCents: 149900 },
    { id: "36", name: "Wallet Slim", slug: "wallet-slim", img: "/seed/wallet.jpg", priceCents: 129900 },
    { id: "37", name: "Cap Classic", slug: "cap-classic", img: "/seed/cap.jpg", priceCents: 69900 },
    { id: "38", name: "Beanie Winter", slug: "beanie-winter", img: "/seed/beanie.jpg", priceCents: 79900 },
    { id: "39", name: "Leather Belt", slug: "leather-belt", img: "/seed/belt.jpg", priceCents: 99900 },
    { id: "40", name: "Analog Watch", slug: "analog-watch", img: "/seed/analog-watch.jpg", priceCents: 349900 },
  ];

  const [visibleCount, setVisibleCount] = useState(12);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Catalog</h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.slice(0, visibleCount).map((p) => (
          <ProductCard
            key={p.id}
            p={{
              id: p.id,
              name: p.name,
              slug: p.slug,
              priceCents: p.priceCents,
              image: p.img,
              images: [],
            }}
          />
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < products.length && (
        <div className="flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="
              px-8 py-3 
              rounded-full 
              bg-gradient-to-r from-emerald-500 to-green-600
              text-white font-semibold
              shadow-md
              hover:from-emerald-600 hover:to-green-700
              hover:shadow-lg
              active:scale-95
              transition-all duration-300
            "
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
