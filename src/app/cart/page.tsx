"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/context/cart-context";

export default function CartPage() {
  const { items, removeItem, clearCart } = useCart();

  const totalCents = items.reduce((sum, i) => sum + i.priceCents * i.qty, 0);
  const [loading, setLoading] = useState(false);

  const handleRemove = (id: string, name: string) => {
  removeItem(id);
  toast.error("Removed from cart", { description: name, duration: 1800 });
};


  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            name: i.name,
            priceCents: i.priceCents,
            quantity: i.qty,
          })),
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // redirect to Stripe
      } else {
        toast.error(data.error || "Checkout failed");
      }
    } catch (err: any) {
      toast.error("Checkout error", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  if (!items.length) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <p className="text-gray-500">Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between border rounded-xl p-3">
            <div className="flex items-center gap-3">
              {item.image && (
                <Image src={item.image} alt={item.name} width={60} height={60} className="rounded-md" />
              )}
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-400">
                  ₹{(item.priceCents / 100).toFixed(2)} × {item.qty}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleRemove(item.id, item.name)}
              className="rounded-lg border px-3 py-1.5 text-sm hover:bg-black/5"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="font-medium">Total: ₹{(totalCents / 100).toFixed(2)}</p>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="rounded-lg bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600 disabled:opacity-60"
        >
          {loading ? "Processing…" : "Checkout"}
        </button>
      </div>
    </section>
  );
}
