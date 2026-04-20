"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const stepKeys = ["s1", "s2", "s3", "s4"] as const;
const stepIcons = ["💬", "🤖", "🖨️", "📦"];
const stepNumbers = ["01", "02", "03", "04"];
const stepGradients = [
  "from-neon-purple to-neon-pink",
  "from-neon-pink to-neon-blue",
  "from-neon-blue to-cyber-green",
  "from-cyber-green to-neon-purple",
];

const comparisonKeys = ["r1", "r2", "r3", "r4", "r5", "r6", "r7"] as const;

export default function HowItWorksPage() {
  const t = useTranslations("HowItWorks");

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
              <span>⚡</span> {t("badge")}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              {t("heading")} <span className="text-gradient">{t("headingBrand")}</span> {t("headingEnd")}
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              {t("subtext")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto space-y-16">
          {stepKeys.map((key, i) => {
            const details: string[] = t.raw(`steps.${key}.details`) as string[];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 items-center`}
              >
                {/* Visual */}
                <div className="flex-1">
                  <div className={`relative aspect-square max-w-sm mx-auto rounded-3xl bg-gradient-to-br ${stepGradients[i]} p-1`}>
                    <div className="w-full h-full rounded-[22px] bg-surface flex flex-col items-center justify-center p-8">
                      <span className="text-7xl mb-4">{stepIcons[i]}</span>
                      <div className={`text-6xl font-bold bg-gradient-to-r ${stepGradients[i]} bg-clip-text text-transparent`}>
                        {stepNumbers[i]}
                      </div>
                    </div>
                    {/* Glow effect */}
                    <div className={`absolute -inset-4 bg-gradient-to-br ${stepGradients[i]} opacity-10 blur-2xl rounded-3xl -z-10`} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className={`inline-flex px-3 py-1 rounded-full bg-gradient-to-r ${stepGradients[i]} text-white text-xs font-bold mb-3`}>
                    {t("step")} {stepNumbers[i]}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                    {t(`steps.${key}.title`)}
                  </h2>
                  <p className="text-gray-400 mb-5 leading-relaxed">
                    {t(`steps.${key}.description`)}
                  </p>
                  <ul className="space-y-2">
                    {details.map((detail: string, di: number) => (
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
            );
          })}
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
              {t("comparisonHeading")} <span className="text-gradient">{t("comparisonBrand")}</span>
            </h2>
            <p className="text-gray-400">
              {t("comparisonSubtext")}
            </p>
          </motion.div>

          <div className="rounded-2xl overflow-hidden border border-surface-border">
            {/* Header */}
            <div className="grid grid-cols-3 bg-surface-light">
              <div className="p-4 text-sm font-semibold text-gray-400">{t("comparisonFeature")}</div>
              <div className="p-4 text-sm font-semibold text-gray-400 text-center">{t("comparisonTraditional")}</div>
              <div className="p-4 text-sm font-semibold text-center">
                <span className="text-gradient font-bold">{t("comparisonBrand")}</span>
              </div>
            </div>
            {/* Rows */}
            {comparisonKeys.map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-surface" : "bg-surface-light/50"} border-t border-surface-border`}
              >
                <div className="p-4 text-sm text-gray-300">{t(`comparison.${key}.feature`)}</div>
                <div className="p-4 text-sm text-gray-500 text-center">{t(`comparison.${key}.traditional`)}</div>
                <div className="p-4 text-sm text-neon-purple font-semibold text-center">
                  {t(`comparison.${key}.trendthread`)}
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
            {t("ctaHeading")} <span className="text-gradient">{t("ctaHighlight")}</span>
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            {t("ctaSubtext")}
          </p>
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-105"
          >
            {t("ctaButton")} ✨
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
