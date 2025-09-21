// src/app/checkout/success/page.tsx
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import InvoiceButton from "./InvoiceButton"; // ✅ import client component

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    return (
      <section className="space-y-4 text-center">
        <h1 className="text-2xl font-bold text-emerald-500">Payment successful</h1>
        <p className="text-gray-400">Thanks for your order! (No session id provided.)</p>
        <div className="flex justify-center gap-4">
          <Link href="/" className="px-4 py-2 rounded-lg bg-emerald-500 text-white">
            Continue shopping
          </Link>
          <Link href="/cart" className="px-4 py-2 rounded-lg border">
            View cart
          </Link>
        </div>
      </section>
    );
  }

  // ✅ Fetch plain session details
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items.data.price.product"],
  });

  const order = {
    id: session.id,
    totalCents: session.amount_total || 0,
    items: session.line_items?.data.map((item) => ({
      name: (item.price?.product as any)?.name || "Item",
      priceCents: item.price?.unit_amount || 0,
      quantity: item.quantity || 1,
    })) || [],
  };

  return (
    <section className="space-y-6 text-center">
      <h1 className="text-2xl font-bold text-emerald-500">Payment successful 🎉</h1>
      <p className="text-gray-400">Thanks for your order! Below is your receipt:</p>

      <div className="max-w-md mx-auto space-y-4 text-left">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between border rounded-lg p-3">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                Qty: {item.quantity} × ₹{(item.priceCents / 100).toFixed(2)}
              </p>
            </div>
            <p className="font-semibold">
              ₹{((item.quantity || 1) * item.priceCents / 100).toFixed(2)}
            </p>
          </div>
        ))}
        <p className="text-right font-bold text-lg">
          Total: ₹{(order.totalCents / 100).toFixed(2)}
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <Link href="/" className="px-4 py-2 rounded-lg bg-emerald-500 text-white">
          Continue shopping
        </Link>
        <Link href="/cart" className="px-4 py-2 rounded-lg border">
          View cart
        </Link>

        {/* ✅ Pass only plain JSON data to client */}
        <InvoiceButton order={order} />
      </div>
    </section>
  );
}
