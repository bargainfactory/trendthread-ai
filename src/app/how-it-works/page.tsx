"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: "💬",
    title: "Describe Your Vision",
    description: "Type any design idea in plain English. Our AI understands complex descriptions, styles, moods, and aesthetics. You can be as specific or as abstract as you want.",
    details: ["Natural language prompts", "Style and mood keywords", "Reference existing art styles", "Multi-language support"],
    gradient: "from-neon-purple to-neon-pink",
  },
  {
    number: "02",
    icon: "🤖",
    title: "AI Generates Designs",
    description: "Our proprietary AI model generates 4 unique design variants in under 10 seconds. Each design is original, high-resolution, and print-ready. Pick your favorite or generate more.",
    details: ["4 unique variants per generation", "High-res vector output", "Style-accurate results", "Unlimited regenerations (Pro)"],
    gradient: "from-neon-pink to-neon-blue",
  },
  {
    number: "03",
    icon: "🖨️",
    title: "Premium Print Production",
    description: "We use industry-leading DTG (Direct-to-Garment) and sublimation printing. Every product is made with premium materials and goes through quality control before shipping.",
    details: ["DTG & sublimation printing", "Premium fabric & materials", "Quality control inspection", "Eco-friendly inks"],
    gradient: "from-neon-blue to-cyber-green",
  },
  {
    number: "04",
    icon: "📦",
    title: "Fast Global Shipping",
    description: "Your custom product ships within 2-5 business days. Track your order in real-time. We ship to 180+ countries with express and standard options.",
    details: ["2-5 day production", "180+ countries", "Real-time tracking", "Express shipping available"],
    gradient: "from-cyber-green to-neon-purple",
  },
];

const comparison = [
  { feature: "Design creation time", traditional: "2-5 days", trendthread: "10 seconds" },
  { feature: "Design cost", traditional: "$50-500+", trendthread: "Free - $0.50" },
  { feature: "Design skills needed", traditional: "Professional", trendthread: "None" },
  { feature: "Product mockups", traditional: "Manual creation", trendthread: "Instant AI mockup" },
  { feature: "Inventory required", traditional: "Yes, upfront", trendthread: "Zero inventory" },
  { feature: "Minimum order", traditional: "25-100 units", trendthread: "1 unit" },
  { feature: "Time to market", traditional: "2-4 weeks", trendthread: "Minutes" },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyber-green/10 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-5xl mx-auto relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-gray-300 mb-6">
              <span>⚡</span> From idea to product in minutes, not weeks
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              How <span className="text-gradient">TrendThread AI</span> Works
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              We replaced the traditional design-to-print pipeline with AI.
              The result? 100x faster, 10x cheaper, infinitely more creative.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto space-y-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 items-center`}
            >
              {/* Visual */}
              <div className="flex-1">
                <div className={`relative aspect-square max-w-sm mx-auto rounded-3xl bg-gradient-to-br ${step.gradient} p-1`}>
                  <div className="w-full h-full rounded-[22px] bg-surface flex flex-col items-center justify-center p-8">
                    <span className="text-7xl mb-4">{step.icon}</span>
                    <div className={`text-6xl font-bold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                      {step.number}
                    </div>
                  </div>
                  {/* Glow effect */}
                  <div className={`absolute -inset-4 bg-gradient-to-br ${step.gradient} opacity-10 blur-2xl rounded-3xl -z-10`} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className={`inline-flex px-3 py-1 rounded-full bg-gradient-to-r ${step.gradient} text-white text-xs font-bold mb-3`}>
                  Step {step.number}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  {step.title}
                </h2>
                <p className="text-gray-400 mb-5 leading-relaxed">
                  {step.description}
                </p>
                <ul className="space-y-2">
                  {step.details.map((detail, di) => (
                    <motion.li
                      key={di}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: di * 0.1 }}
                      className="flex items-center gap-3 text-sm"
                    >
                      <span className="w-5 h-5 rounded-full bg-neon-purple/20 text-neon-purple flex items-center justify-center text-xs">
                        ✓
                      </span>
                      <span className="text-gray-300">{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent" />
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Traditional POD vs <span className="text-gradient">TrendThread AI</span>
            </h2>
            <p className="text-gray-400">
              See why creators are switching to AI-powered print on demand.
            </p>
          </motion.div>

          <div className="rounded-2xl overflow-hidden border border-surface-border">
            {/* Header */}
            <div className="grid grid-cols-3 bg-surface-light">
              <div className="p-4 text-sm font-semibold text-gray-400">Feature</div>
              <div className="p-4 text-sm font-semibold text-gray-400 text-center">Traditional POD</div>
              <div className="p-4 text-sm font-semibold text-center">
                <span className="text-gradient font-bold">TrendThread AI</span>
              </div>
            </div>
            {/* Rows */}
            {comparison.map((row, i) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-surface" : "bg-surface-light/50"} border-t border-surface-border`}
              >
                <div className="p-4 text-sm text-gray-300">{row.feature}</div>
                <div className="p-4 text-sm text-gray-500 text-center">{row.traditional}</div>
                <div className="p-4 text-sm text-neon-purple font-semibold text-center">
                  {row.trendthread}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to <span className="text-gradient">Get Started?</span>
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Create your first AI design in 10 seconds. Free, no credit card required.
          </p>
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-105"
          >
            Open Design Studio ✨
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
