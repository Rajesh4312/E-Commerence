import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!user) return NextResponse.json({ ok: false, error: "User not found" }, { status: 404 });

  const product = await prisma.product.findFirst({
    where: { active: true },
    select: { id: true, priceCents: true, currency: true, name: true },
  });
  if (!product)
    return NextResponse.json({ ok: false, error: "No products to seed" }, { status: 400 });

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      totalCents: product.priceCents,
      currency: product.currency,
      status: "Delivered",
      items: {
        create: [
          {
            productId: product.id,
            quantity: 1,
            priceCents: product.priceCents,
            currency: product.currency,
          },
        ],
      },
    },
    include: { items: true },
  });

  return NextResponse.json({ ok: true, order });
}
