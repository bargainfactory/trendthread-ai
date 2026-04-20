"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { styleOptions, productTypes, colorPalettes } from "@/lib/mock-data";

interface GeneratedDesign {
  id: string;
  url: string;
  prompt: string;
  title: string;
}

export default function StudioPage() {
  const t = useTranslations("Studio");
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("y2k");
  const [selectedProduct, setSelectedProduct] = useState("tshirt");
  const [selectedPalette, setSelectedPalette] = useState("neon");
  const [isGenerating, setIsGenerating] = useState(false);
  const [designs, setDesigns] = useState<GeneratedDesign[]>([]);
  const [activeVariant, setActiveVariant] = useState(0);
  const [saved, setSaved] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [error, setError] = useState<string | null>(null);

  const activeProductType = productTypes.find((p) => p.id === selectedProduct);
  const activeStyle = styleOptions.find((s) => s.id === selectedStyle);
  const activePalette = colorPalettes.find((p) => p.id === selectedPalette);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setDesigns([]);
    setLoadedImages(new Set());
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          style: selectedStyle,
          palette: selectedPalette,
          count: 4,
        }),
      });

      if (!res.ok) throw new Error("Generation failed");

      const data = await res.json();
      setDesigns(data.images);
      setActiveVariant(0);
    } catch {
      setError(t("errorMessage"));
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, selectedStyle, selectedPalette, isGenerating, t]);

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  }, []);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const activeDesignUrl = designs[activeVariant]?.url;
  const quickIdeas = ["i1", "i2", "i3", "i4"] as const;

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
              <span className="text-gradient">{t("heading")}</span> 🎨
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              {t("subtext")}
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
                  <span>💬</span> {t("designPrompt")}
                </h3>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={t("promptPlaceholder")}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all resize-none"
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs text-gray-500">{t("quickIdeas")}</span>
                  {quickIdeas.map((key) => (
                    <button
                      key={key}
                      onClick={() => setPrompt(t(`ideas.${key}`))}
                      className="text-xs px-3 py-1 rounded-full bg-surface-light border border-surface-border text-gray-400 hover:text-neon-purple hover:border-neon-purple/50 transition-all"
                    >
                      {t(`ideas.${key}`)}
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
                  <span>🎭</span> {t("style")}
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
                      <span className="text-[10px] text-gray-300 mt-1 block">{s.name}</span>
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
                  <span>📦</span> {t("productType")}
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
                      <span className="text-[10px] text-gray-300 mt-1 block">{pt.name}</span>
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
                  <span>🎨</span> {t("colorPalette")}
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
                    {t("aiGenerating")}
                  </span>
                ) : (
                  `${t("generateDesign")} ✨`
                )}
              </motion.button>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center"
                >
                  {error}
                </motion.div>
              )}
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
                  <span>👁️</span> {t("livePreview")}
                  {designs.length > 0 && (
                    <span className="ml-auto text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                      {t("aiGenerated")}
                    </span>
                  )}
                </h3>

                {/* Product mockup */}
                <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-surface-light to-surface border border-surface-border flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-5">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: "radial-gradient(circle, #a855f7 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                  </div>

                  {activeDesignUrl ? (
                    <motion.div
                      key={activeVariant}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="relative w-full h-full"
                    >
                      {!loadedImages.has(activeVariant) && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <div className="w-12 h-12 rounded-full border-3 border-neon-purple/30 border-t-neon-purple animate-spin" />
                        </div>
                      )}
                      <Image
                        src={activeDesignUrl}
                        alt={`Design variant ${activeVariant + 1}`}
                        fill
                        className="object-cover rounded-2xl"
                        onLoad={() => handleImageLoad(activeVariant)}
                        unoptimized
                      />
                      {/* Product overlay indicator */}
                      <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1.5 z-20">
                        <span>{activeProductType?.emoji}</span>
                        <span>{activeProductType?.name}</span>
                      </div>
                      <div className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-xs font-medium flex items-center gap-1.5 z-20">
                        <span className="text-neon-purple">{activeStyle?.emoji}</span>
                        <span className="text-gray-300">{activeStyle?.name}</span>
                      </div>
                    </motion.div>
                  ) : isGenerating ? (
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full border-4 border-neon-purple/30 border-t-neon-purple animate-spin mx-auto mb-4" />
                      <p className="text-gray-400 text-sm">{t("creatingMasterpiece")}</p>
                      <p className="text-gray-500 text-xs mt-1">{t("creatingWait")}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <span className="text-6xl block mb-4">{activeProductType?.emoji}</span>
                      <p className="text-gray-500 text-sm">{t("previewPlaceholder")}</p>
                      <p className="text-gray-600 text-xs mt-1">{t("previewHint")}</p>
                    </div>
                  )}
                </div>

                {/* Design info bar */}
                {designs.length > 0 && (
                  <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-surface-light">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {activeProductType?.name} - {activeStyle?.name}
                      </p>
                      <p className="text-xs text-gray-400">{t("palette", { name: activePalette?.name ?? "" })}</p>
                    </div>
                    <p className="text-lg font-bold text-neon-purple">${activeProductType?.basePrice}</p>
                  </div>
                )}
              </motion.div>

              {/* Design Variants */}
              <AnimatePresence>
                {designs.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl bg-surface border border-surface-border p-6"
                  >
                    <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <span>🎯</span> {t("aiDesignVariants")}
                      <span className="text-xs text-gray-500 ml-auto">{t("clickToPreview")}</span>
                    </h3>
                    <div className="grid grid-cols-4 gap-3">
                      {designs.map((d, i) => (
                        <button
                          key={d.id}
                          onClick={() => setActiveVariant(i)}
                          className={`relative aspect-square rounded-xl overflow-hidden transition-all ${
                            activeVariant === i
                              ? "ring-2 ring-neon-purple glow-purple scale-105"
                              : "border border-surface-border hover:border-neon-purple/50 opacity-70 hover:opacity-100"
                          }`}
                        >
                          {!loadedImages.has(i + 10) && (
                            <div className="absolute inset-0 flex items-center justify-center bg-surface z-10">
                              <div className="w-5 h-5 rounded-full border-2 border-neon-purple/30 border-t-neon-purple animate-spin" />
                            </div>
                          )}
                          <Image
                            src={d.url}
                            alt={d.title}
                            fill
                            className="object-cover"
                            onLoad={() => handleImageLoad(i + 10)}
                            unoptimized
                          />
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/60 text-[10px] text-white font-medium z-20">
                            {d.title}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <AnimatePresence>
                {designs.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-4 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-shadow"
                      >
                        {t("orderNow", { price: activeProductType?.basePrice ?? "" })}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSave}
                        className="px-6 py-4 rounded-xl bg-surface border border-surface-border text-white font-semibold hover:border-neon-purple transition-all"
                      >
                        {saved ? `${t("saved")} ✅` : `${t("save")} 💾`}
                      </motion.button>
                    </div>
                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="w-full py-3 rounded-xl bg-surface-light border border-surface-border text-gray-300 font-medium hover:text-white hover:border-neon-purple/50 transition-all disabled:opacity-50"
                    >
                      🔄 {t("regenerate")}
                    </button>
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
