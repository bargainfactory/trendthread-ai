"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/cart-context";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const t = useTranslations("Navbar");

  const navLinks = [
    { href: "/" as const, label: t("home") },
    { href: "/collections" as const, label: t("collections") },
    { href: "/shop" as const, label: t("shop") },
    { href: "/studio" as const, label: t("designStudio") },
    { href: "/how-it-works" as const, label: t("howItWorks") },
    { href: "/creators" as const, label: t("creators") },
    { href: "/pricing" as const, label: t("pricing") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🧵</span>
            <span className="text-xl font-bold text-gradient">
              TrendThread AI
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <LanguageSwitcher />

            {/* Cart */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-gray-300 hover:text-white transition-colors"
              aria-label={t("openCart")}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-gradient-to-r from-neon-purple to-neon-pink text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* CTA */}
            <Link
              href="/studio"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink text-white text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            >
              <span>{t("startCreating")}</span>
              <span>✨</span>
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white"
              aria-label={t("toggleMenu")}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-strong border-t border-white/5"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/studio"
                onClick={() => setMobileOpen(false)}
                className="block mt-3 text-center px-4 py-2 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink text-white font-semibold"
              >
                {t("startCreating")} ✨
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
