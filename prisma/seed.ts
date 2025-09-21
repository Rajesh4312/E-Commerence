// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // 1) Upsert categories by slug (unique)
  const cats = await Promise.all([
    prisma.category.upsert({
      where: { slug: "apparel" },
      create: { name: "Apparel", slug: "apparel" },
      update: {},
    }),
    prisma.category.upsert({
      where: { slug: "audio" },
      create: { name: "Audio", slug: "audio" },
      update: {},
    }),
    prisma.category.upsert({
      where: { slug: "bags" },
      create: { name: "Bags", slug: "bags" },
      update: {},
    }),
    prisma.category.upsert({
      where: { slug: "accessories" },
      create: { name: "Accessories", slug: "accessories" },
      update: {},
    }),
  ]);

  // helper to grab id by slug
  const catId = (slug: string) => cats.find((c) => c.slug === slug)!.id;

  // 2) Seed (or upsert) products using correct string categoryId
  const products = [
    {
      name: "Comfy Cotton T-Shirt",
      slug: "comfy-cotton-tee",
      description: "Soft and breathable everyday tee.",
      priceCents: 79900,
      stock: 25,
      active: true,
      categoryId: catId("apparel"),
      images: {
        create: [{ url: "/seed/tee.jpg", alt: "Comfy tee" }],
      },
    },
    {
      name: "Wireless Earbuds Pro",
      slug: "wireless-earbuds-pro",
      description: "Crisp sound with all-day battery.",
      priceCents: 329900,
      stock: 18,
      active: true,
      categoryId: catId("audio"),
      images: {
        create: [{ url: "/seed/earbuds.jpg", alt: "Earbuds" }],
      },
    },
    {
      name: "Urban Daypack",
      slug: "urban-daypack",
      description: "Lightweight backpack for daily carry.",
      priceCents: 219900,
      stock: 12,
      active: true,
      categoryId: catId("bags"),
      images: {
        create: [{ url: "/seed/backpack.jpg", alt: "Backpack" }],
      },
    },
    {
      name: "Minimalist Backpack",
      slug: "minimalist-backpack",
      description: "Clean design, perfect for work and travel.",
      priceCents: 219900,
      stock: 8,
      active: true,
      categoryId: catId("bags"),
      images: {
        create: [{ url: "/seed/bag.jpg", alt: "Minimalist Backpack" }],
      },
    },
    {
      name: "Studio Headphones X",
      slug: "studio-headphones-x",
      description: "Professional sound for creators.",
      priceCents: 499900,
      stock: 6,
      active: true,
      categoryId: catId("audio"),
      images: {
        create: [{ url: "/seed/headphones.jpg", alt: "Studio headphones" }],
      },
    },
    {
      name: "Sporty Hoodie",
      slug: "sporty-hoodie",
      description: "Warm, comfy, and perfect for workouts.",
      priceCents: 159900,
      stock: 15,
      active: true,
      categoryId: catId("apparel"),
      images: {
        create: [{ url: "/seed/hoodie.jpg", alt: "Sport hoodie" }],
      },
    },
    {
      name: "Eco Water Bottle",
      slug: "eco-water-bottle",
      description: "Reusable, lightweight, BPA-free bottle.",
      priceCents: 49900,
      stock: 40,
      active: true,
      categoryId: catId("accessories"),
      images: {
        create: [{ url: "/seed/bottle.jpg", alt: "Eco water bottle" }],
      },
    },
    {
      name: "Leather Messenger Bag",
      slug: "leather-messenger-bag",
      description: "Premium leather, classic design.",
      priceCents: 599900,
      stock: 5,
      active: true,
      categoryId: catId("bags"),
      images: {
        create: [{ url: "/seed/messenger.jpg", alt: "Messenger Bag" }],
      },
    },
    {
      name: "Wireless Speaker Mini",
      slug: "wireless-speaker-mini",
      description: "Pocket-sized with big sound.",
      priceCents: 199900,
      stock: 20,
      active: true,
      categoryId: catId("audio"),
      images: {
        create: [{ url: "/seed/speaker.jpg", alt: "Mini speaker" }],
      },
    },
    {
      name: "Classic Cap",
      slug: "classic-cap",
      description: "Adjustable fit, stylish everyday wear.",
      priceCents: 69900,
      stock: 30,
      active: true,
      categoryId: catId("apparel"),
      images: {
        create: [{ url: "/seed/cap.jpg", alt: "Cap" }],
      },
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  console.log("✅ Seeded categories & 10 products");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
