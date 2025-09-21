// src/store/cart.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: string;
  name: string;
  priceCents: number;
  qty: number;
  image?: string | null;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  totalCents: number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item, qty = 1) => {
        const items = [...get().items];
        const idx = items.findIndex((i) => i.id === item.id);
        if (idx > -1) items[idx].qty += qty;
        else items.push({ ...item, qty });
        set({ items });
      },
      remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      setQty: (id, qty) =>
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, qty: Math.max(1, qty) } : i
          ),
        }),
      clear: () => set({ items: [] }),
      get totalCents() {
        return get().items.reduce((sum, i) => sum + i.priceCents * i.qty, 0);
      },
    }),
    { name: "cart-v1" }
  )
);
