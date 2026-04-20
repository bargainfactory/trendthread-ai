"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { creators } from "@/lib/mock-data";

const tierData = [
  { key: "gold", commission: 10, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30" },
  { key: "platinum", commission: 15, color: "text-gray-300", bg: "bg-gray-300/10", border: "border-gray-300/30" },
  { key: "diamond", commission: 20, color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/30" },
];

const joinStepKeys = ["s1", "s2", "s3", "s4"] as const;
const joinStepIcons = ["📝", "🎨", "📢", "💰"];

const creatorTestimonials = [
  { name: "PixelQueen", text: "I went from zero to $12K/month in 3 months. The AI tools make design creation effortless. Best decision I ever made.", avatar: "👑", earned: "$42,450" },
  { name: "VaporMike", text: "I run my entire merch business through TrendThread AI. 124 designs, thousands of sales, and I work maybe 2 hours a day.", avatar: "🌊", earned: "$56,780" },
  { name: "TechVibes", text: "The creator program changed my life. I quit my 9-5 and now I make double what I used to, designing what I love.", avatar: "🤖", earned: "$38,920" },
];

export default function CreatorsPage() {
  const t = useTranslations("Creators");
  const [monthlyViews, setMonthlyViews] = useState(10000);
  const [conversionRate] = useState(2.5);
  const [avgPrice] = useState(30);
  const [commissionTier, setCommissionTier] = useState(15);

  const estimatedSales = Math.floor((monthlyViews * conversionRate) / 100);
  const estimatedEarnings = estimatedSales * avgPrice * (commissionTier / 100);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    social: "",
    followers: "",
    niche: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon-pink/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-neon-purple/15 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-5xl mx-auto relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-gray-300 mb-6">
              <span>💰</span> {t("badge")}
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

      {/* Stats showcase */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {([
              { labelKey: "stats.activeCreators", value: "45,200+", icon: "🎨" },
              { labelKey: "stats.totalPayouts", value: "$3.2M+", icon: "💰" },
              { labelKey: "stats.avgMonthly", value: "$840", icon: "📈" },
              { labelKey: "stats.topCreator", value: "$15,670/mo", icon: "🏆" },
            ] as const).map((stat, i) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl bg-surface border border-surface-border p-5 text-center card-hover"
              >
                <span className="text-2xl block mb-2">{stat.icon}</span>
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-1">{t(stat.labelKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Tiers */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              {t("commissionTiers").split(" ").slice(0, -1).join(" ")} <span className="text-gradient">{t("commissionTiers").split(" ").pop()}</span>
            </h2>
            <p className="text-gray-400">{t("commissionSubtext")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tierData.map((tier, i) => (
              <motion.div
                key={tier.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl ${tier.bg} border ${tier.border} p-8 text-center card-hover`}
              >
                <span className={`text-4xl font-bold ${tier.color}`}>
                  {tier.commission}%
                </span>
                <h3 className="text-xl font-bold text-white mt-2 mb-1">
                  {t(`tiers.${tier.key}.name`)}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{t(`tiers.${tier.key}.requirement`)}</p>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>✓ {t("tierFeatures.aiTools")}</p>
                  <p>✓ {t("tierFeatures.analytics")}</p>
                  <p>✓ {t("tierFeatures.weeklyPayouts")}</p>
                  {tier.key !== "gold" && <p>✓ {t("tierFeatures.prioritySupport")}</p>}
                  {tier.key === "diamond" && <p>✓ {t("tierFeatures.featuredPlacement")}</p>}
                  {tier.key === "diamond" && <p>✓ {t("tierFeatures.customStorefront")}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent" />
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              {t("howToJoin").split(" ").slice(0, -1).join(" ")} <span className="text-gradient">{t("howToJoin").split(" ").pop()}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {joinStepKeys.map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface border border-surface-border mb-4">
                  <span className="text-2xl">{joinStepIcons[i]}</span>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-white mb-1">{t(`joinSteps.${key}.title`)}</h3>
                <p className="text-sm text-gray-400">{t(`joinSteps.${key}.desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings Calculator */}
      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="text-gradient">{t("calculator.heading")}</span> 💰
            </h2>
            <p className="text-gray-400">{t("calculator.subtext")}</p>
          </motion.div>

          <div className="rounded-2xl bg-surface border border-surface-border p-6 md:p-8">
            <div className="space-y-6">
              {/* Monthly views slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-300">{t("calculator.monthlyViews")}</label>
                  <span className="text-sm font-semibold text-neon-purple">
                    {monthlyViews.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={100000}
                  step={1000}
                  value={monthlyViews}
                  onChange={(e) => setMonthlyViews(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #a855f7 ${(monthlyViews / 100000) * 100}%, #25253d ${(monthlyViews / 100000) * 100}%)`,
                  }}
                />
              </div>

              {/* Commission tier */}
              <div>
                <label className="text-sm text-gray-300 block mb-2">{t("calculator.commissionTier")}</label>
                <div className="flex gap-2">
                  {[10, 15, 20].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setCommissionTier(rate)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        commissionTier === rate
                          ? "bg-neon-purple/20 text-neon-purple border border-neon-purple"
                          : "bg-surface-light border border-surface-border text-gray-400"
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-surface-border">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">{t("calculator.estSales")}</p>
                  <p className="text-xl font-bold text-white">{estimatedSales}{t("calculator.perMonth")}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">{t("calculator.monthlyEarnings")}</p>
                  <p className="text-xl font-bold text-neon-purple">
                    ${estimatedEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">{t("calculator.annualEarnings")}</p>
                  <p className="text-xl font-bold text-neon-pink">
                    ${(estimatedEarnings * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Testimonials */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              {t("stories").split(" ").slice(0, -1).join(" ")} <span className="text-gradient">{t("stories").split(" ").pop()}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creatorTestimonials.map((ct, i) => (
              <motion.div
                key={ct.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl glass p-6 card-hover"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{ct.avatar}</span>
                  <div>
                    <p className="font-semibold text-white">{ct.name}</p>
                    <p className="text-xs text-neon-purple">{t("earned")} {ct.earned}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed italic">
                  &ldquo;{ct.text}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Creators Leaderboard */}
      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              {t("topCreators").split(" ").slice(0, -1).join(" ")} <span className="text-gradient">{t("topCreators").split(" ").pop()}</span> 🏆
            </h2>
          </motion.div>

          <div className="space-y-3">
            {creators
              .sort((a, b) => b.earnings - a.earnings)
              .map((creator, i) => (
                <motion.div
                  key={creator.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-surface-border card-hover"
                >
                  <span className="text-lg font-bold text-gray-500 w-6">
                    #{i + 1}
                  </span>
                  <span className="text-2xl">{creator.avatar}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{creator.name}</p>
                    <p className="text-xs text-gray-400">
                      {creator.designs} {t("designs")} · {creator.followers.toLocaleString()} {t("followers")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-neon-purple">
                      ${creator.earnings.toLocaleString()}
                    </p>
                    <p className={`text-xs ${
                      creator.tier === "diamond" ? "text-cyan-400" :
                      creator.tier === "platinum" ? "text-gray-300" : "text-yellow-400"
                    }`}>
                      {t(`tiers.${creator.tier}.name`)}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Apply Form */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent" />
        <div className="max-w-xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="text-gradient">{t("applyNow")}</span> 🚀
            </h2>
            <p className="text-gray-400">
              {t("applySubtext")}
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl bg-surface border border-green-500/30 p-8 text-center"
            >
              <span className="text-5xl block mb-4">🎉</span>
              <h3 className="text-xl font-bold text-white mb-2">{t("submitted.title")}</h3>
              <p className="text-gray-400">
                {t("submitted.text")}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl bg-surface border border-surface-border p-6 md:p-8 space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">{t("form.fullName")}</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple transition-all"
                  placeholder={t("form.namePlaceholder")}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">{t("form.email")}</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple transition-all"
                  placeholder={t("form.emailPlaceholder")}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">{t("form.socialMedia")}</label>
                <input
                  type="url"
                  value={formData.social}
                  onChange={(e) => setFormData({ ...formData, social: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple transition-all"
                  placeholder={t("form.socialPlaceholder")}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">{t("form.followerCount")}</label>
                <select
                  value={formData.followers}
                  onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white focus:outline-none focus:border-neon-purple transition-all"
                >
                  <option value="">{t("form.selectRange")}</option>
                  <option value="0-1k">{t("form.range0to1k")}</option>
                  <option value="1k-10k">{t("form.range1kto10k")}</option>
                  <option value="10k-50k">{t("form.range10kto50k")}</option>
                  <option value="50k-100k">{t("form.range50kto100k")}</option>
                  <option value="100k+">{t("form.range100kPlus")}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">{t("form.niche")}</label>
                <input
                  type="text"
                  value={formData.niche}
                  onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple transition-all"
                  placeholder={t("form.nichePlaceholder")}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-shadow mt-2"
              >
                {t("form.submit")}
              </motion.button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
