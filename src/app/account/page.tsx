// src/app/account/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin?callbackUrl=/account");

  const user = session.user!;
  return (
    <section className="space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Account</h1>
        <div className="text-sm text-gray-400">
          Signed in as {user.email ?? user.name}
        </div>
      </header>

      {/* your cards / mock data here */}
      <div className="rounded-xl border p-4">
        <p className="mb-2">Welcome, {user.name ?? "user"}.</p>
        <Link href="/orders" className="text-emerald-500 hover:underline">
          View orders →
        </Link>
      </div>
    </section>
  );
}
