import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrendThread AI | AI-Powered Print on Demand",
  description:
    "Create viral designs with AI in seconds. Print on demand for Gen Z creators, side-hustlers, and trendsetters. Design, sell, repeat.",
  keywords: [
    "AI design",
    "print on demand",
    "custom merch",
    "trending designs",
    "creator economy",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
