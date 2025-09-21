import { prisma } from "@/lib/prisma";

export async function listProducts() {
  return prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
    include: {
      images: { orderBy: { id: "asc" } },   // <- stable ordering
    },
  });
}
