"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AIDesignGenerator from "@/components/AIDesignGenerator";
import StatsCounter from "@/components/StatsCounter";
import ProductCard from "@/components/ProductCard";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { products } from "@/lib/mock-data";

const floatingMockups = [
  { emoji: "👕", gradient: "from-purple-500 to-pink-500", x: "10%", y: "20%", delay: 0 },
  { emoji: "☕", gradient: "from-cyan-400 to-blue-500", x: "80%", y: "15%", delay: 1 },
  { emoji: "🖼️", gradient: "from-orange-400 to-pink-500", x: "75%", y: "60%", delay: 2 },
  { emoji: "📱", gradient: "from-green-400 to-cyan-500", x: "15%", y: "65%", delay: 0.5 },
  { emoji: "🧥", gradient: "from-violet-500 to-fuchsia-500", x: "50%", y: "10%", delay: 1.5 },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-pink/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-neon-blue/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        {/* Floating mockups */}
        {floatingMockups.map((m, i) => (
          <motion.div
            key={i}
            className={`absolute hidden md:flex w-16 h-16 rounded-xl bg-gradient-to-br ${m.gradient} items-center justify-center text-2xl shadow-lg opacity-40`}
            style={{ left: m.x, top: m.y }}
            animate={{
              y: [0, -15, 5, -10, 0],
              rotate: [0, 3, -2, 1, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: m.delay,
              ease: "easeInOut",
            }}
          >
            {m.emoji}
          </motion.div>
        ))}

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-gray-300 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>2.4M+ designs generated and counting</span>
            <span>🔥</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">Design.</span>{" "}
            <span className="text-gradient">Print.</span>{" "}
            <span className="text-white">Profit.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Turn any idea into a viral merch design in seconds with AI.
            No design skills needed. Print on demand. Ship worldwide.
            Start your brand today.
          </motion.p>

          {/* AI Generator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <AIDesignGenerator />
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative py-8 border-y border-surface-border">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/5 via-neon-pink/5 to-neon-blue/5" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <StatsCounter />
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Trending Right Now</span> 🔥
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              The hottest AI-generated designs flying off the shelves. Updated in real-time.
            </p>
          </motion.div>

          {/* Trending tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {["All", "Apparel", "Mugs", "Posters", "Phone Cases", "Y2K", "Anime", "Retro"].map((tag) => (
              <button
                key={tag}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  tag === "All"
                    ? "bg-gradient-to-r from-neon-purple to-neon-pink text-white"
                    : "bg-surface border border-surface-border text-gray-400 hover:text-white hover:border-neon-purple/50"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.slice(0, 8).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-surface border border-surface-border text-white font-semibold hover:border-neon-purple transition-all"
            >
              View All Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent" />
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              From Idea to Doorstep in <span className="text-gradient">4 Steps</span>
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              The fastest way to create and sell custom merch. No inventory, no hassle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", icon: "💬", title: "Type Your Idea", desc: "Describe any design concept in natural language" },
              { step: "02", icon: "🤖", title: "AI Generates", desc: "Get 4 unique designs in under 10 seconds" },
              { step: "03", icon: "🖨️", title: "We Print It", desc: "Premium DTG printing on quality products" },
              { step: "04", icon: "📦", title: "Shipped Fast", desc: "Delivered to your door or your customers" },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-surface border border-surface-border mb-4 group-hover:border-neon-purple transition-all">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink text-white text-xs font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-neon-purple hover:text-neon-pink transition-colors font-medium"
            >
              Learn more about our process
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Creators <span className="text-gradient">Love Us</span> 💜
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              Join 45,000+ creators already making money with TrendThread AI.
            </p>
          </motion.div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 via-neon-pink/10 to-neon-blue/10" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to Create Your{" "}
            <span className="text-gradient">First Design?</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8 text-lg">
            Join thousands of creators earning money with AI-generated designs.
            Start for free. No credit card needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/studio"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-105"
            >
              Start Creating Free ✨
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-surface border border-surface-border text-white font-semibold hover:border-neon-purple transition-all"
            >
              View Pricing
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
