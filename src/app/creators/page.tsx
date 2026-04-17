"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { creators } from "@/lib/mock-data";

const tiers = [
  { name: "Gold", commission: 10, requirement: "0-50 sales/month", color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30" },
  { name: "Platinum", commission: 15, requirement: "51-200 sales/month", color: "text-gray-300", bg: "bg-gray-300/10", border: "border-gray-300/30" },
  { name: "Diamond", commission: 20, requirement: "200+ sales/month", color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/30" },
];

const steps = [
  { icon: "📝", title: "Apply", desc: "Fill out a quick application form. Approval takes under 24 hours." },
  { icon: "🎨", title: "Create", desc: "Use our AI tools to generate amazing designs and build collections." },
  { icon: "📢", title: "Share", desc: "Share your designs on social media, your store, or our marketplace." },
  { icon: "💰", title: "Earn", desc: "Earn commissions on every sale. Get paid weekly via PayPal or Stripe." },
];

const creatorTestimonials = [
  { name: "PixelQueen", text: "I went from zero to $12K/month in 3 months. The AI tools make design creation effortless. Best decision I ever made.", avatar: "👑", earned: "$42,450" },
  { name: "VaporMike", text: "I run my entire merch business through TrendThread AI. 124 designs, thousands of sales, and I work maybe 2 hours a day.", avatar: "🌊", earned: "$56,780" },
  { name: "TechVibes", text: "The creator program changed my life. I quit my 9-5 and now I make double what I used to, designing what I love.", avatar: "🤖", earned: "$38,920" },
];

export default function CreatorsPage() {
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
              <span>💰</span> $3.2M+ paid out to creators
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              <span className="text-gradient">Creator Program</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Turn your creativity into income. Design with AI, sell to the world,
              and earn up to 20% commission on every sale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats showcase */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Active Creators", value: "45,200+", icon: "🎨" },
              { label: "Total Payouts", value: "$3.2M+", icon: "💰" },
              { label: "Avg. Monthly Earnings", value: "$840", icon: "📈" },
              { label: "Top Creator Earnings", value: "$15,670/mo", icon: "🏆" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl bg-surface border border-surface-border p-5 text-center card-hover"
              >
                <span className="text-2xl block mb-2">{stat.icon}</span>
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
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
              Commission <span className="text-gradient">Tiers</span>
            </h2>
            <p className="text-gray-400">Earn more as you sell more. Simple.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
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
                  {tier.name}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{tier.requirement}</p>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>✓ AI design tools access</p>
                  <p>✓ Analytics dashboard</p>
                  <p>✓ Weekly payouts</p>
                  {tier.name !== "Gold" && <p>✓ Priority support</p>}
                  {tier.name === "Diamond" && <p>✓ Featured placement</p>}
                  {tier.name === "Diamond" && <p>✓ Custom storefront</p>}
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
              How to <span className="text-gradient">Join</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface border border-surface-border mb-4">
                  <span className="text-2xl">{step.icon}</span>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.desc}</p>
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
              <span className="text-gradient">Earnings Calculator</span> 💰
            </h2>
            <p className="text-gray-400">See how much you could earn as a TrendThread AI creator.</p>
          </motion.div>

          <div className="rounded-2xl bg-surface border border-surface-border p-6 md:p-8">
            <div className="space-y-6">
              {/* Monthly views slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-300">Monthly Store Views</label>
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
                <label className="text-sm text-gray-300 block mb-2">Commission Tier</label>
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
                  <p className="text-xs text-gray-500 mb-1">Est. Sales</p>
                  <p className="text-xl font-bold text-white">{estimatedSales}/mo</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Monthly Earnings</p>
                  <p className="text-xl font-bold text-neon-purple">
                    ${estimatedEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Annual Earnings</p>
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
              Creator <span className="text-gradient">Stories</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creatorTestimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl glass p-6 card-hover"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{t.avatar}</span>
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-neon-purple">Earned: {t.earned}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
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
              Top <span className="text-gradient">Creators</span> 🏆
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
                      {creator.designs} designs · {creator.followers.toLocaleString()} followers
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
                      {creator.tier.charAt(0).toUpperCase() + creator.tier.slice(1)}
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
              <span className="text-gradient">Apply Now</span> 🚀
            </h2>
            <p className="text-gray-400">
              Join our creator community and start earning today.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl bg-surface border border-green-500/30 p-8 text-center"
            >
              <span className="text-5xl block mb-4">🎉</span>
              <h3 className="text-xl font-bold text-white mb-2">Application Submitted!</h3>
              <p className="text-gray-400">
                We will review your application and get back to you within 24 hours.
                Check your email for confirmation.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl bg-surface border border-surface-border p-6 md:p-8 space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple transition-all"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Social Media Profile</label>
                <input
                  type="url"
                  value={formData.social}
                  onChange={(e) => setFormData({ ...formData, social: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple transition-all"
                  placeholder="https://instagram.com/yourhandle"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Follower Count</label>
                <select
                  value={formData.followers}
                  onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white focus:outline-none focus:border-neon-purple transition-all"
                >
                  <option value="">Select range</option>
                  <option value="0-1k">0 - 1,000</option>
                  <option value="1k-10k">1,000 - 10,000</option>
                  <option value="10k-50k">10,000 - 50,000</option>
                  <option value="50k-100k">50,000 - 100,000</option>
                  <option value="100k+">100,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Your Niche</label>
                <input
                  type="text"
                  value={formData.niche}
                  onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple transition-all"
                  placeholder="e.g., Fashion, Gaming, Art, Fitness"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-shadow mt-2"
              >
                Submit Application
              </motion.button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
