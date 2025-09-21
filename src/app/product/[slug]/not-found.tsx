import Link from "next/link";

export default function NotFound() {
  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-bold">Product not found</h1>
      <Link href="/catalog" className="underline">Back to catalog</Link>
    </section>
  );
}
