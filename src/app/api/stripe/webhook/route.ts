// src/app/api/stripe/webhook/route.ts
import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";         // ensure Node runtime (not edge)
export const dynamic = "force-dynamic";  // allow reading raw body

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: Request) {
  const sig = headers().get("stripe-signature");
  if (!sig) return new NextResponse("missing signature", { status: 400 });

  const buf = Buffer.from(await req.arrayBuffer());
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("webhook signature verify failed:", err.message);
    return new NextResponse(`signature error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        // TODO: create Order in your DB with session.id / amount_total / customer_email, etc.
        break;
      }
      default:
        // handle other events if needed
        break;
    }
    return new NextResponse("ok", { status: 200 });
  } catch (err: any) {
    console.error("webhook handler failed:", err);
    return new NextResponse("server error", { status: 500 });
  }
}

// Disable Next.js body parsing so we can verify signature on the raw body
export const config = { api: { bodyParser: false } } as any;
