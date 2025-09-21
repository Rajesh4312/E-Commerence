import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const catData = [
  { name: "Bags", slug: "bags" },
  { name: "Audio", slug: "audio" },
  { name: "Apparel", slug: "apparel" },
  { name: "Accessories", slug: "accessories" },
];

const products = [
  // Bags
  {
    name: "Minimalist Backpack",
    slug: "minimalist-backpack",
    description: "Clean, durable backpack for everyday carry.",
    priceCents: 219900,
    categorySlug: "bags",
    img: "/seed/backpack.jpg",
    alt: "Minimalist Backpack"
  },
  {
    name: "Urban Daypack",
    slug: "urban-daypack",
    description: "City-ready daypack with quick-access pockets.",
    priceCents: 199900,
    categorySlug: "bags",
    img: "/seed/backpack.jpg",
    alt: "Urban Daypack"
  },
  {
    name: "Travel Duffel",
    slug: "travel-duffel",
    description: "Spacious duffel for weekend getaways.",
    priceCents: 279900,
    categorySlug: "bags",
    img: "/seed/duffle.jpg",
    alt: "Travel Duffel"
  },
  {
    name: "Sling Crossbody",
    slug: "sling-crossbody",
    description: "Lightweight sling for daily essentials.",
    priceCents: 129900,
    categorySlug: "bags",
    img: "/seed/sling.png",
    alt: "Sling Crossbody"
  },

  // Audio
  {
    name: "Wireless Earbuds Pro",
    slug: "wireless-earbuds-pro",
    description: "Premium earbuds with ANC and long battery life.",
    priceCents: 329900,
    categorySlug: "audio",
    img: "/seed/earbuds.jpg",
    alt: "Wireless Earbuds Pro"
  },
  {
    name: "Noise-cancel Headphones",
    slug: "noise-cancel-headphones",
    description: "Over-ear ANC headphones for immersive sound.",
    priceCents: 329900,
    categorySlug: "audio",
    img: "/seed/headphones.jpg",
    alt: "Noise-cancel Headphones"
  },
  {
    name: "Portable Bluetooth Speaker",
    slug: "portable-bluetooth-speaker",
    description: "Compact speaker with surprisingly big sound.",
    priceCents: 149900,
    categorySlug: "audio",
    img: "/seed/speaker.jpg",
    alt: "Portable Bluetooth Speaker"
  },

  // Apparel
  {
    name: "Comfy Cotton T-Shirt",
    slug: "comfy-cotton-tee",
    description: "Ultra-soft 100% cotton tee.",
    priceCents: 79900,
    categorySlug: "apparel",
    img: "/seed/tee.jpg",
    alt: "Comfy Cotton T-Shirt"
  },
  {
    name: "Slim-fit Chinos",
    slug: "slim-fit-chinos",
    description: "Tailored chinos with stretch.",
    priceCents: 199900,
    categorySlug: "apparel",
    img: "/seed/chinos.jpg",
    alt: "Slim-fit Chinos"
  },
  {
    name: "Everyday Hoodie",
    slug: "everyday-hoodie",
    description: "Cozy hoodie for all seasons.",
    priceCents: 189900,
    categorySlug: "apparel",
    img: "/seed/hoodie.jpg",
    alt: "Everyday Hoodie"
  },

  // Accessories (example)
  {
    name: "Stainless Water Bottle",
    slug: "stainless-water-bottle",
    description: "Insulated bottle keeps drinks cold/hot.",
    priceCents: 79900,
    categorySlug: "accessories",
    img: "/seed/bottle.jpg",
    alt: "Stainless Water Bottle"
  },
];

async function main() {
  console.log("Seeding categories...");
  for (const c of catData) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }

  console.log("Clearing existing products/images...");
  await prisma.productImage.deleteMany({});
  await prisma.product.deleteMany({});

  console.log("Seeding products...");
  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        priceCents: p.priceCents,
        currency: "INR",
        stock: 100,
        active: true,
        category: { connect: { slug: p.categorySlug } },
        images: {
          create: [{ url: p.img, alt: p.alt }],
        },
      },
    });
  }

  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
