// src/app/orders/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

function inr(amountCents: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amountCents / 100);
}

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/api/auth/signin?callbackUrl=/orders");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true },
  });

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-2">Orders</h1>
        <p className="text-gray-400">
          We couldn’t find your account. Try signing out and back in.
        </p>
      </div>
    );
  }

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      items: { include: { product: { select: { name: true, images: true } } } },
    },
  });

  return (
    <section className="container mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Link
          href="/catalog"
          className="rounded-xl border px-3 py-2 text-sm hover:bg-white/5 transition"
        >
          Continue shopping
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border p-10 text-center">
          <div className="text-lg font-medium">No orders yet</div>
          <p className="text-gray-400 mt-1">
            You haven’t placed any orders. Browse the catalog and try a demo checkout.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="rounded-2xl border p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">
                    Order {o.id.slice(0, 8).toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-400">
                    {o.createdAt.toLocaleDateString()} • {o.items.length} items • {o.status}
                  </div>
                </div>
                <div className="text-right font-semibold">{inr(o.totalCents)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
