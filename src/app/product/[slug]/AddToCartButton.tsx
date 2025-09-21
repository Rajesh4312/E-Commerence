"use client";

import { useCart } from "@/lib/use-cart";
import { toast } from "sonner";

type Props = {
  id: string;
  name: string;
  priceCents: number;
  image?: string;
  slug: string;
};

export default function AddToCartButton(props: Props) {
  const { add } = useCart();

  return (
    <button
      className="px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black"
      onClick={() => {
        add({ ...props, qty: 1 });
        toast.success(`${props.name} added to cart`, {
          dismissible: true,
          duration: 2500,
        });
      }}
    >
      Add to cart
    </button>
  );
}
