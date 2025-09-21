// src/app/api/stripe/checkout/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  const session = await auth();
  const body = await req.json(); // { items: [{price, quantity}] }

  const checkout = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: body.items,
    success_url: `${process.env.NEXTAUTH_URL}/orders?success=1`,
    cancel_url: `${process.env.NEXTAUTH_URL}/cart?canceled=1`,
    metadata: {
      userId: session?.user?.id ?? "",
    },
  });

  return NextResponse.json({ url: checkout.url });
}
