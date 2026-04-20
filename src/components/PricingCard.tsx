"use client";

import { motion } from "framer-motion";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  popularLabel?: string;
  index?: number;
}

export default function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  popular = false,
  popularLabel = "Most Popular",
  index = 0,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={`relative rounded-2xl p-6 md:p-8 ${
        popular
          ? "bg-gradient-to-b from-neon-purple/20 to-neon-pink/10 border-2 border-neon-purple glow-purple"
          : "bg-surface border border-surface-border"
      } card-hover`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink text-white text-xs font-bold">
          {popularLabel}
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <p className="text-sm text-gray-400 mb-4">{description}</p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-white">{price}</span>
          <span className="text-gray-400 text-sm">{period}</span>
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <span className="text-green-400 mt-0.5 shrink-0">✓</span>
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`w-full py-3 rounded-xl font-bold transition-all ${
          popular
            ? "bg-gradient-to-r from-neon-purple to-neon-pink text-white hover:shadow-lg hover:shadow-purple-500/25"
            : "bg-surface-light border border-surface-border text-white hover:border-neon-purple"
        }`}
      >
        {cta}
      </motion.button>
    </motion.div>
  );
}
