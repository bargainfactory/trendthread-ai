"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/mock-data";

const categories = ["All", "Apparel", "Mugs", "Posters", "Phone Cases"];
const styles = ["All Styles", "Y2K", "Anime", "Retro", "Minimalist", "Abstract"];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 - $40", min: 25, max: 40 },
  { label: "$40+", min: 40, max: Infinity },
];

export default function ShopPage() {
  const [category, setCategory] = useState("All");
  const [style, setStyle] = useState("All Styles");
  const [priceRange, setPriceRange] = useState(0);
  const [sortBy, setSortBy] = useState<"trending" | "price-low" | "price-high" | "popular">("trending");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (category !== "All") {
      const catMap: Record<string, string> = {
        Apparel: "apparel",
        Mugs: "mugs",
        Posters: "posters",
        "Phone Cases": "phone-cases",
      };
      result = result.filter((p) => p.category === catMap[category]);
    }

    if (style !== "All Styles") {
      result = result.filter((p) => p.style === style);
    }

    const range = priceRanges[priceRange];
    result = result.filter((p) => p.price >= range.min && p.price < range.max);

    switch (sortBy) {
      case "trending":
        result.sort((a, b) => b.trendingScore - a.trendingScore);
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        result.sort((a, b) => b.salesCount - a.salesCount);
        break;
    }

    return result;
  }, [category, style, priceRange, sortBy]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-neon-blue/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-neon-purple/15 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              <span className="text-gradient">The Shop</span> 🛍️
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Browse {products.length}+ AI-generated designs on premium products.
              New drops every day.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar filters */}
            <div className="lg:w-64 shrink-0">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full flex items-center justify-between p-4 rounded-xl bg-surface border border-surface-border text-white mb-4"
              >
                <span className="font-semibold">Filters</span>
                <span>{showFilters ? "−" : "+"}</span>
              </button>

              <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
                {/* Category filter */}
                <div className="rounded-xl bg-surface border border-surface-border p-4">
                  <h3 className="font-semibold text-white mb-3 text-sm">Category</h3>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          category === cat
                            ? "bg-neon-purple/20 text-neon-purple font-medium"
                            : "text-gray-400 hover:text-white hover:bg-surface-light"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style filter */}
                <div className="rounded-xl bg-surface border border-surface-border p-4">
                  <h3 className="font-semibold text-white mb-3 text-sm">Style</h3>
                  <div className="space-y-1">
                    {styles.map((s) => (
                      <button
                        key={s}
                        onClick={() => setStyle(s)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          style === s
                            ? "bg-neon-purple/20 text-neon-purple font-medium"
                            : "text-gray-400 hover:text-white hover:bg-surface-light"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price filter */}
                <div className="rounded-xl bg-surface border border-surface-border p-4">
                  <h3 className="font-semibold text-white mb-3 text-sm">Price Range</h3>
                  <div className="space-y-1">
                    {priceRanges.map((range, i) => (
                      <button
                        key={range.label}
                        onClick={() => setPriceRange(i)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          priceRange === i
                            ? "bg-neon-purple/20 text-neon-purple font-medium"
                            : "text-gray-400 hover:text-white hover:bg-surface-light"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style tags */}
                <div className="rounded-xl bg-surface border border-surface-border p-4">
                  <h3 className="font-semibold text-white mb-3 text-sm">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {["trending", "neon", "anime", "retro", "y2k", "cyber", "kawaii", "minimal"].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-neon-purple/10 text-neon-purple text-xs font-medium cursor-pointer hover:bg-neon-purple/20 transition-all"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Products grid */}
            <div className="flex-1">
              {/* Sort bar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-400">
                  <span className="text-white font-semibold">{filtered.length}</span>{" "}
                  products found
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 hidden sm:inline">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="px-3 py-2 rounded-lg bg-surface border border-surface-border text-sm text-white focus:outline-none focus:border-neon-purple"
                  >
                    <option value="trending">Trending</option>
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <span className="text-5xl block mb-4">🔍</span>
                  <p className="text-gray-400 text-lg mb-2">No products found</p>
                  <p className="text-gray-500 text-sm">Try adjusting your filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              )}

              {/* Load more area - infinite scroll feel */}
              {filtered.length > 0 && (
                <div className="text-center mt-12">
                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-gray-400 text-sm">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Scroll for more designs...
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
