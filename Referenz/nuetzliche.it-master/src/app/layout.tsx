import type {Metadata} from "next";
import {Suspense} from "react";
import {Geist} from "next/font/google";
import {AnalyticsProvider} from "@/components/analytics/AnalyticsProvider";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.nuetzliche.it"),
  title: "nützliche.IT",
  description: "Maßgeschneiderte Softwareentwicklung und lokale KI-Lösungen.",
  icons: {
    icon: "/brand/logo-square-512.png",
    shortcut: "/brand/logo-square-512.png",
    apple: "/brand/logo-square-512.png"
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${geist.variable} font-sans antialiased`}>
        <Suspense fallback={null}>
          <AnalyticsProvider />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
