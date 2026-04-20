"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/mock-data";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const t = useTranslations("ProductCard");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group relative rounded-2xl bg-surface border border-surface-border overflow-hidden card-hover"
      data-product-id={product.id}
      data-shopify-product-handle={product.title.toLowerCase().replace(/\s+/g, "-")}
    >
      {/* Image area */}
      <div
        className={`relative aspect-square bg-gradient-to-br ${product.gradient} flex items-center justify-center overflow-hidden`}
      >
        <span className="text-6xl group-hover:scale-110 transition-transform duration-500">
          {product.emoji}
        </span>

        {/* Trending badge */}
        {product.trendingScore >= 90 && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-semibold text-white flex items-center gap-1">
            <span className="text-orange-400">🔥</span> {t("trending")}
          </div>
        )}

        {/* Quick actions overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => addItem(product)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink text-white text-sm font-semibold shadow-lg"
            >
              {t("addToCart")}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-white text-sm border border-white/20"
            >
              👁️
            </motion.button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-white text-sm truncate">
            {product.title}
          </h3>
          <span className="text-neon-purple font-bold text-sm shrink-0">
            ${product.price}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">{t("by")} {product.creator}</span>
          <span className="text-xs text-gray-500">
            {t("sold", { count: product.salesCount.toLocaleString() })}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-neon-purple/10 text-neon-purple text-[10px] font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
