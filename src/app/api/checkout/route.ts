// src/app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20", // ✅ use a stable version
});

type CartItem = {
  name: string;
  priceCents: number; // integer in paise (₹799.00 => 79900)
  quantity: number;
};

export async function POST(req: Request) {
  try {
    const { items } = (await req.json()) as { items: CartItem[] };

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty." },
        { status: 400 }
      );
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      items.map((i) => ({
        quantity: Math.max(1, Number(i.quantity || 1)),
        price_data: {
          currency: "inr",
          unit_amount: i.priceCents, // already paise
          product_data: {
            name: i.name,
          },
        },
      }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("[checkout] error", err);
    return NextResponse.json(
      { error: err?.message ?? "Checkout failed" },
      { status: 500 }
    );
  }
}
