"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import PricingCard from "@/components/PricingCard";
import FAQAccordion from "@/components/FAQAccordion";

const planKeys = ["free", "pro", "business"] as const;

export default function PricingPage() {
  const t = useTranslations("Pricing");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [bulkQty, setBulkQty] = useState(50);
  const [contactSent, setContactSent] = useState(false);

  const bulkDiscount =
    bulkQty >= 500 ? 40 : bulkQty >= 200 ? 30 : bulkQty >= 100 ? 20 : bulkQty >= 50 ? 10 : 0;
  const basePerUnit = 15;
  const discountedPerUnit = basePerUnit * (1 - bulkDiscount / 100);
  const totalBulk = discountedPerUnit * bulkQty;

  // Build FAQ items from translations
  const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"] as const;
  const faqs = faqKeys.map((key) => ({
    q: t(`faqs.${key}.q`),
    a: t(`faqs.${key}.a`),
  }));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-neon-purple/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-cyber-green/10 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-5xl mx-auto relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              {t("heading")} <span className="text-gradient">{t("headingHighlight")}</span> {t("headingEnd")}
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto text-lg mb-8">
              {t("subtext")}
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-3 p-1 rounded-full bg-surface border border-surface-border">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === "monthly"
                    ? "bg-gradient-to-r from-neon-purple to-neon-pink text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {t("monthly")}
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all relative ${
                  billingCycle === "annual"
                    ? "bg-gradient-to-r from-neon-purple to-neon-pink text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {t("annual")}
                <span className="absolute -top-3 -right-3 px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold">
                  {t("annualDiscount")}
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {planKeys.map((key, i) => {
              const planPrice = t(`plans.${key}.price`);
              const planPeriod = t(`plans.${key}.period`);
              const features: string[] = t.raw(`plans.${key}.features`) as string[];

              let displayPrice = planPrice;
              let displayPeriod = planPeriod;
              if (billingCycle === "annual" && planPrice !== "$0") {
                const monthly = parseInt(planPrice.replace("$", ""));
                const annual = Math.round(monthly * 12 * 0.8);
                displayPrice = `$${Math.round(annual / 12)}`;
                displayPeriod = t("billedAnnually");
              }
              return (
                <PricingCard
                  key={key}
                  name={t(`plans.${key}.name`)}
                  price={displayPrice}
                  period={displayPeriod}
                  description={t(`plans.${key}.description`)}
                  features={features}
                  cta={t(`plans.${key}.cta`)}
                  popular={key === "pro"}
                  popularLabel={t("mostPopular")}
                  index={i}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Bulk Pricing Calculator */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent" />
        <div className="max-w-3xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="text-gradient">{t("bulkPricing")}</span> {t("bulkCalculator")}
            </h2>
            <p className="text-gray-400">
              {t("bulkSubtext")}
            </p>
          </motion.div>

          <div className="rounded-2xl bg-surface border border-surface-border p-6 md:p-8">
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label className="text-sm text-gray-300">{t("orderQuantity")}</label>
                <span className="text-sm font-semibold text-neon-purple">
                  {bulkQty} {t("units")}
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={1000}
                step={10}
                value={bulkQty}
                onChange={(e) => setBulkQty(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #a855f7 ${(bulkQty / 1000) * 100}%, #25253d ${(bulkQty / 1000) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>10</span>
                <span>250</span>
                <span>500</span>
                <span>750</span>
                <span>1000</span>
              </div>
            </div>

            {/* Discount tiers visualization */}
            <div className="flex gap-2 mb-6">
              {[
                { min: 50, discount: 10 },
                { min: 100, discount: 20 },
                { min: 200, discount: 30 },
                { min: 500, discount: 40 },
              ].map((tier) => (
                <div
                  key={tier.min}
                  className={`flex-1 p-3 rounded-lg text-center text-xs transition-all ${
                    bulkQty >= tier.min
                      ? "bg-neon-purple/20 text-neon-purple border border-neon-purple/30"
                      : "bg-surface-light text-gray-500 border border-surface-border"
                  }`}
                >
                  <p className="font-bold">{tier.discount}% {t("off")}</p>
                  <p>{t("unitsPlus", { count: tier.min })}</p>
                </div>
              ))}
            </div>

            {/* Results */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-surface-light">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">{t("perUnit")}</p>
                <p className="text-xl font-bold text-white">
                  ${discountedPerUnit.toFixed(2)}
                </p>
                {bulkDiscount > 0 && (
                  <p className="text-xs text-gray-500 line-through">
                    ${basePerUnit.toFixed(2)}
                  </p>
                )}
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">{t("discount")}</p>
                <p className={`text-xl font-bold ${bulkDiscount > 0 ? "text-green-400" : "text-gray-500"}`}>
                  {bulkDiscount}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">{t("total")}</p>
                <p className="text-xl font-bold text-neon-purple">
                  ${totalBulk.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Contact */}
      <section className="px-4 pb-20">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-gradient-to-br from-neon-purple/10 to-neon-pink/10 border border-neon-purple/30 p-8 text-center"
          >
            <span className="text-4xl block mb-4">🏢</span>
            <h3 className="text-2xl font-bold text-white mb-2">{t("enterprise.heading")}</h3>
            <p className="text-gray-400 mb-6">
              {t("enterprise.subtext")}
            </p>
            {contactSent ? (
              <div className="text-green-400 font-semibold">
                {t("enterprise.contactSent")} ✅
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={t("enterprise.emailPlaceholder")}
                  className="flex-1 px-4 py-3 rounded-xl bg-surface border border-surface-border text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setContactSent(true)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink text-white font-semibold"
                >
                  {t("enterprise.contactSales")}
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              {t("faqHeading")} <span className="text-gradient">{t("faqHighlight")}</span>
            </h2>
          </motion.div>

          <FAQAccordion items={faqs} />
        </div>
      </section>
    </div>
  );
}
