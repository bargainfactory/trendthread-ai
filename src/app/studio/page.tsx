"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { styleOptions, productTypes, colorPalettes } from "@/lib/mock-data";

const mockGeneratedDesigns = [
  { emoji: "🌌", title: "Variant A" },
  { emoji: "✨", title: "Variant B" },
  { emoji: "🎆", title: "Variant C" },
  { emoji: "💫", title: "Variant D" },
];

export default function StudioPage() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("y2k");
  const [selectedProduct, setSelectedProduct] = useState("tshirt");
  const [selectedPalette, setSelectedPalette] = useState("neon");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [activeVariant, setActiveVariant] = useState(0);
  const [saved, setSaved] = useState(false);

  const activeProductType = productTypes.find((p) => p.id === selectedProduct);
  const activeStyle = styleOptions.find((s) => s.id === selectedStyle);
  const activePalette = colorPalettes.find((p) => p.id === selectedPalette);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
    }, 2500);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-12 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-cyber-green/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-neon-purple/15 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3">
              <span className="text-gradient">Design Studio</span> 🎨
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Create custom designs with AI. Choose your style, product, and colors,
              then let our AI do the magic.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Controls */}
            <div className="space-y-6">
              {/* Prompt Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl bg-surface border border-surface-border p-6"
              >
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <span>💬</span> Design Prompt
                </h3>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your design idea... e.g., 'A neon cyberpunk cat riding a skateboard through a retro city at sunset'"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all resize-none"
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs text-gray-500">Quick ideas:</span>
                  {["Vaporwave sunset", "Kawaii space cat", "Glitch art portrait"].map((idea) => (
                    <button
                      key={idea}
                      onClick={() => setPrompt(idea)}
                      className="text-xs px-3 py-1 rounded-full bg-surface-light border border-surface-border text-gray-400 hover:text-neon-purple hover:border-neon-purple/50 transition-all"
                    >
                      {idea}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Style Selector */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl bg-surface border border-surface-border p-6"
              >
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <span>🎭</span> Style
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {styleOptions.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedStyle(s.id)}
                      className={`p-3 rounded-xl text-center transition-all ${
                        selectedStyle === s.id
                          ? "bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 border-2 border-neon-purple"
                          : "bg-surface-light border border-surface-border hover:border-neon-purple/50"
                      }`}
                    >
                      <span className="text-xl block">{s.emoji}</span>
                      <span className="text-[10px] text-gray-300 mt-1 block">
                        {s.name}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Product Type Selector */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl bg-surface border border-surface-border p-6"
              >
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <span>📦</span> Product Type
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {productTypes.map((pt) => (
                    <button
                      key={pt.id}
                      onClick={() => setSelectedProduct(pt.id)}
                      className={`p-3 rounded-xl text-center transition-all ${
                        selectedProduct === pt.id
                          ? "bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 border-2 border-neon-purple"
                          : "bg-surface-light border border-surface-border hover:border-neon-purple/50"
                      }`}
                    >
                      <span className="text-2xl block">{pt.emoji}</span>
                      <span className="text-[10px] text-gray-300 mt-1 block">
                        {pt.name}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Color Palette Picker */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-2xl bg-surface border border-surface-border p-6"
              >
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <span>🎨</span> Color Palette
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {colorPalettes.map((palette) => (
                    <button
                      key={palette.id}
                      onClick={() => setSelectedPalette(palette.id)}
                      className={`p-3 rounded-xl transition-all ${
                        selectedPalette === palette.id
                          ? "border-2 border-neon-purple bg-neon-purple/10"
                          : "border border-surface-border hover:border-neon-purple/50"
                      }`}
                    >
                      <div className="flex gap-1 mb-2 justify-center">
                        {palette.colors.map((color, ci) => (
                          <div
                            key={ci}
                            className="w-5 h-5 rounded-full border border-white/10"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-300">{palette.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Generate Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue text-white font-bold text-lg animate-gradient hover:shadow-lg hover:shadow-purple-500/25 transition-shadow disabled:opacity-50"
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Generating Your Design...
                  </span>
                ) : (
                  "Generate Design ✨"
                )}
              </motion.button>
            </div>

            {/* Right: Preview */}
            <div className="space-y-6">
              {/* Live Preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl bg-surface border border-surface-border p-6"
              >
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <span>👁️</span> Live Preview
                </h3>

                {/* Product mockup */}
                <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-surface-light to-surface border border-surface-border flex items-center justify-center overflow-hidden">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: "radial-gradient(circle, #a855f7 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }} />
                  </div>

                  {generated ? (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center"
                    >
                      {/* Product with design */}
                      <div className="relative">
                        <span className="text-8xl block">{activeProductType?.emoji}</span>
                        <div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{
                            background: activePalette
                              ? `linear-gradient(135deg, ${activePalette.colors[0]}40, ${activePalette.colors[2]}40)`
                              : undefined,
                            borderRadius: "50%",
                            width: "60%",
                            height: "60%",
                            margin: "auto",
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                          }}
                        >
                          <span className="text-4xl">
                            {mockGeneratedDesigns[activeVariant].emoji}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mt-4">
                        {activeStyle?.name} style on {activeProductType?.name}
                      </p>
                    </motion.div>
                  ) : isGenerating ? (
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full border-4 border-neon-purple/30 border-t-neon-purple animate-spin mx-auto mb-4" />
                      <p className="text-gray-400 text-sm">Creating your masterpiece...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <span className="text-6xl block mb-4">{activeProductType?.emoji}</span>
                      <p className="text-gray-500 text-sm">
                        Your design will appear here
                      </p>
                    </div>
                  )}
                </div>

                {/* Design info bar */}
                {generated && (
                  <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-surface-light">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {activeProductType?.name} - {activeStyle?.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {activePalette?.name} palette
                      </p>
                    </div>
                    <p className="text-lg font-bold text-neon-purple">
                      ${activeProductType?.basePrice}
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Design Variants */}
              <AnimatePresence>
                {generated && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl bg-surface border border-surface-border p-6"
                  >
                    <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <span>🎯</span> Design Variants
                    </h3>
                    <div className="grid grid-cols-4 gap-3">
                      {mockGeneratedDesigns.map((d, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveVariant(i)}
                          className={`aspect-square rounded-xl flex items-center justify-center text-3xl transition-all ${
                            activeVariant === i
                              ? "ring-2 ring-neon-purple glow-purple"
                              : "bg-surface-light border border-surface-border hover:border-neon-purple/50"
                          }`}
                          style={{
                            background: activePalette
                              ? `linear-gradient(135deg, ${activePalette.colors[i % 4]}30, ${activePalette.colors[(i + 1) % 4]}30)`
                              : undefined,
                          }}
                        >
                          {d.emoji}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <AnimatePresence>
                {generated && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    {/* Shopify Buy Button integration point */}
                    {/* data-shopify-buy-button data-variant-id="custom-design" */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-4 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-shadow"
                    >
                      Order Now - ${activeProductType?.basePrice}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSave}
                      className="px-6 py-4 rounded-xl bg-surface border border-surface-border text-white font-semibold hover:border-neon-purple transition-all"
                    >
                      {saved ? "Saved! ✅" : "Save 💾"}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
