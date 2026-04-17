"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const footerLinks = {
  Product: [
    { label: "Design Studio", href: "/studio" },
    { label: "Shop", href: "/shop" },
    { label: "Collections", href: "/collections" },
    { label: "Pricing", href: "/pricing" },
  ],
  Company: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Creator Program", href: "/creators" },
    { label: "About Us", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Shipping Info", href: "#" },
    { label: "Returns", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "DMCA", href: "#" },
  ],
};

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative mt-20 border-t border-white/5">
      {/* Gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter section */}
        <div className="text-center mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3">
            <span className="text-gradient">Stay Ahead of the Trends</span>
          </h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Get weekly drops of trending designs, creator tips, and exclusive
            deals.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 rounded-xl bg-surface border border-surface-border text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-shadow"
            >
              {subscribed ? "Subscribed! ✅" : "Subscribe"}
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
              &copy; 2026. All rights reserved.
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
