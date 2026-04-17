"use client";

import { CartProvider } from "@/lib/cart-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Toast from "@/components/Toast";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Navbar />
      <CartDrawer />
      <Toast />
      <main className="pt-16">{children}</main>
      <Footer />
    </CartProvider>
  );
}
