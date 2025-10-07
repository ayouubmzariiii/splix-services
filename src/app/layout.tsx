import type { Metadata } from "next";
import Script from "next/script";
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
        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){
              if(f.fbq)return; n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0';
              n.queue=[]; t=b.createElement(e); t.async=!0;
              t.src=v; s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)
            }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '144623441746788');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className="antialiased bg-gray-50">
        {/* Meta Pixel noscript fallback */}
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
               src="https://www.facebook.com/tr?id=144623441746788&ev=PageView&noscript=1" alt="" />
        </noscript>
        <HotDealsProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <DiscordButton discordInvite="https://discord.gg/jMZvhhP5KT" />
          <WhatsAppButton phoneNumber="212682969910" />
        </HotDealsProvider>
      </body>
    </html>
  );
}
