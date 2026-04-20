"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { collections } from "@/lib/mock-data";

const categoryKeys = ["all", "apparel", "mugs", "posters", "phoneCases"] as const;

export default function CollectionsPage() {
  const t = useTranslations("Collections");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"trending" | "sales" | "newest">("trending");

  const sorted = [...collections].sort((a, b) => {
    if (sortBy === "trending") return b.trendingScore - a.trendingScore;
    if (sortBy === "sales") return b.salesCount - a.salesCount;
    return 0;
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-neon-purple/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-neon-pink/15 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-gray-300 mb-6">
              <span>🔥</span> {t("badge")}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              <span className="text-gradient">{t("heading")}</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              {t("subtext")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Category tags */}
            <div className="flex flex-wrap gap-2">
              {categoryKeys.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-neon-purple to-neon-pink text-white"
                      : "bg-surface border border-surface-border text-gray-400 hover:text-white hover:border-neon-purple/50"
                  }`}
                >
                  {t(`categories.${cat}`)}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{t("sortBy")}</span>
              {(["trending", "sales", "newest"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    sortBy === s
                      ? "bg-neon-purple/20 text-neon-purple"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {t(`sortOptions.${s}`)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((collection, i) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-2xl bg-surface border border-surface-border overflow-hidden card-hover"
              >
                {/* Cover gradient */}
                <div
                  className={`relative h-48 bg-gradient-to-br ${collection.gradient} flex items-center justify-center overflow-hidden`}
                >
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-500">
                    {collection.emoji}
                  </span>

                  {/* Trending score badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-bold text-white flex items-center gap-1">
                    <span className="text-orange-400">🔥</span>
                    {collection.trendingScore}
                  </div>

                  {/* Product count */}
                  <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white">
                    {t("designs", { count: collection.productCount })}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Link
                      href="/shop"
                      className="px-6 py-2 rounded-xl bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/30 hover:bg-white/30 transition-all"
                    >
                      {t("exploreCollection")}
                    </Link>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">
                      {collection.name}
                    </h3>
                    <span className="text-xs text-gray-500 shrink-0">
                      {t("sold", { count: collection.salesCount.toLocaleString() })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {t("by")}{" "}
                      <span className="text-neon-purple font-medium">
                        {collection.creator}
                      </span>
                    </span>
                    <div className="flex gap-1">
                      {collection.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-neon-purple/10 text-neon-purple text-[10px] font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
