import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Providers from "@/components/providers"; 
import ClientToaster from "@/components/client-toaster";

export const metadata: Metadata = {
  title: "RadiShop",
  description: "E-commerce portfolio demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900 flex flex-col antialiased">
        {/* Global providers (cart, theme, etc.) */}
        <Providers>
          <Header />
          <main className="flex-1 container mx-auto px-4 py-6">
            {children}
          </main>
          <Footer />
        </Providers>

        {/* Toast notifications mounted once globally */}
        <ClientToaster />
      </body>
    </html>
  );
}
