"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/use-cart";
import { toast } from "sonner";

export default function SuccessClient() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
    toast.success("Payment successful! (demo)");
  }, [clear]);

  return null;
}
