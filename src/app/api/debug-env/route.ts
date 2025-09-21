import { NextResponse } from "next/server";
export const runtime = "nodejs";

export async function GET() {
  const key = (process.env.STRIPE_SECRET_KEY ?? "").trim();
  return NextResponse.json({
    hasKey: !!key,
    startsWith: key ? key.slice(0, 7) : null, // should be "sk_test"
    length: key.length,
  });
}
