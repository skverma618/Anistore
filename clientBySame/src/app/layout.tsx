import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { StoreProvider } from "@/contexts/StoreProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Anime Marketplace | Premium Anime Collectibles & Merchandise",
  description: "The ultimate destination for premium anime figurines, clothing, weapons, and collectibles from your favorite anime series.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen font-body antialiased">
        <StoreProvider>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
