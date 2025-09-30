import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HotDealsProvider from "@/components/HotDealsProvider";
import WhatsAppButton from "@/components/WhatsAppButton";
import DiscordButton from "@/components/DiscordButton";

export const metadata: Metadata = {
  title: "Passify - Premium Digital Services at Unbeatable Prices",
  description: "Get access to premium streaming, productivity, and creative services at discounted prices. Spotify, Netflix, Adobe, and more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className="antialiased bg-gray-50">
        <HotDealsProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <DiscordButton discordInvite="https://discord.gg/MxZu6uqM" />
          <WhatsAppButton phoneNumber="212682969910" />
        </HotDealsProvider>
      </body>
    </html>
  );
}
