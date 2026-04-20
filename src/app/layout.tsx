import type { Metadata } from "next";
import "./globals.css";

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
  return children;
}
