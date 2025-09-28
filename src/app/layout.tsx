import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HotDealsProvider from "@/components/HotDealsProvider";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Splix Services - Premium Digital Services at Unbeatable Prices",
  description: "Get access to premium streaming, productivity, and creative services at discounted prices. Spotify, Netflix, Adobe, and more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        <HotDealsProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <WhatsAppButton phoneNumber="212684199400" />
        </HotDealsProvider>
      </body>
    </html>
  );
}
