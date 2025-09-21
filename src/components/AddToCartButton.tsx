"use client";

import { useCart } from "@/context/cart-context";
import { toast } from "sonner";

export default function AddToCartButton({ product }: { product: any }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      priceCents: product.priceCents,
      image: product.image,
      qty: 1,
    });

    toast.success("Added to cart", {
      description: `${product.name} has been added.`,
      duration: 2000,
    });
  };

  return (
    <button
      onClick={handleAdd}
      className="rounded-lg bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600 transition"
    >
      Add to cart
    </button>
  );
}
