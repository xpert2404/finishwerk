import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import type { ReactNode } from "react";
import { BackgroundScene } from "@/components/layout/background-scene";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { VendorConsentProvider } from "@/components/booking/vendor-consent-store";
import { baseMetadata } from "@/lib/metadata";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${manrope.variable} bg-background font-sans text-foreground antialiased`}
      >
        <VendorConsentProvider>
          <SmoothScrollProvider />
          <BackgroundScene />
          <div className="relative min-h-screen">
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </div>
        </VendorConsentProvider>
      </body>
    </html>
  );
}
