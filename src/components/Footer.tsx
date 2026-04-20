"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const socials = [
  { name: "Twitter/X", icon: "𝕏", href: "#" },
  { name: "Instagram", icon: "📸", href: "#" },
  { name: "TikTok", icon: "🎵", href: "#" },
  { name: "Discord", icon: "💬", href: "#" },
  { name: "YouTube", icon: "▶️", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const t = useTranslations("Footer");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const footerLinks = {
    [t("product")]: [
      { label: t("links.designStudio"), href: "/studio" as const },
      { label: t("links.shop"), href: "/shop" as const },
      { label: t("links.collections"), href: "/collections" as const },
      { label: t("links.pricing"), href: "/pricing" as const },
    ],
    [t("company")]: [
      { label: t("links.howItWorks"), href: "/how-it-works" as const },
      { label: t("links.creatorProgram"), href: "/creators" as const },
      { label: t("links.aboutUs"), href: "/" as const },
      { label: t("links.blog"), href: "/" as const },
    ],
    [t("support")]: [
      { label: t("links.helpCenter"), href: "/" as const },
      { label: t("links.contact"), href: "/" as const },
      { label: t("links.shippingInfo"), href: "/" as const },
      { label: t("links.returns"), href: "/" as const },
    ],
    [t("legal")]: [
      { label: t("links.privacyPolicy"), href: "/" as const },
      { label: t("links.termsOfService"), href: "/" as const },
      { label: t("links.cookiePolicy"), href: "/" as const },
      { label: t("links.dmca"), href: "/" as const },
    ],
  };

  return (
    <footer className="relative mt-20 border-t border-white/5">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter section */}
        <div className="text-center mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3">
            <span className="text-gradient">{t("newsletter.heading")}</span>
          </h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            {t("newsletter.subtext")}
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("newsletter.placeholder")}
              required
              className="flex-1 px-4 py-3 rounded-xl bg-surface border border-surface-border text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-shadow"
            >
              {subscribed ? `${t("newsletter.subscribed")} ✅` : t("newsletter.subscribe")}
            </motion.button>
          </form>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-neon-purple transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧵</span>
            <span className="font-bold text-gradient">TrendThread AI</span>
            <span className="text-sm text-gray-500">
              &copy; {t("copyright")}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="w-10 h-10 rounded-full bg-surface border border-surface-border flex items-center justify-center text-lg hover:border-neon-purple hover:bg-surface-light transition-all"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
