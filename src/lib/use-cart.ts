"use client";
import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  priceCents: number;
  qty: number;
  image?: string;
  slug?: string;
};

type CartState = {
  items: CartItem[];
  add: (i: Omit<CartItem, "qty"> & { qty?: number }) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  totalCents: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  add: (i) =>
    set((s) => {
      const idx = s.items.findIndex((x) => x.id === i.id);
      if (idx >= 0) {
        const cp = [...s.items];
        cp[idx].qty += i.qty ?? 1;
        return { items: cp };
      }
      return { items: [...s.items, { ...i, qty: i.qty ?? 1 }] };
    }),
  setQty: (id, qty) =>
    set((s) => ({ items: s.items.map((x) => (x.id === id ? { ...x, qty } : x)) })),
  remove: (id) => set((s) => ({ items: s.items.filter((x) => x.id !== id) })),
  clear: () => set({ items: [] }),
  totalCents: () => get().items.reduce((sum, x) => sum + x.qty * x.priceCents, 0),
}));
