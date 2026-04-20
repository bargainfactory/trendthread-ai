"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface GeneratedDesign {
  id: string;
  url: string;
  prompt: string;
  title: string;
}

export default function AIDesignGenerator() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [designs, setDesigns] = useState<GeneratedDesign[]>([]);
  const [activeDesign, setActiveDesign] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("AIGenerator");

  const samplePrompts = [
    t("samplePrompts.p1"),
    t("samplePrompts.p2"),
    t("samplePrompts.p3"),
    t("samplePrompts.p4"),
    t("samplePrompts.p5"),
    t("samplePrompts.p6"),
    t("samplePrompts.p7"),
    t("samplePrompts.p8"),
  ];

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setDesigns([]);
    setActiveDesign(null);
    setLoadedImages(new Set());
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style: "cyberpunk", palette: "neon" }),
      });

      if (!res.ok) throw new Error("Generation failed");

      const data = await res.json();
      setDesigns(data.images);
    } catch {
      setError(t("errorMessage"));
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, isGenerating, t]);

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  }, []);

  const fillRandomPrompt = () => {
    setPrompt(samplePrompts[Math.floor(Math.random() * samplePrompts.length)]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Input area */}
      <div className="relative">
        <div className="glass rounded-2xl p-1 glow-purple">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder={t("placeholder")}
              className="flex-1 px-5 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
            />
            <div className="flex gap-2 p-1">
              <button
                onClick={fillRandomPrompt}
                className="px-4 py-3 rounded-xl bg-surface-light text-gray-300 hover:text-white hover:bg-surface border border-surface-border transition-all text-sm"
              >
                🎲 {t("random")}
              </button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 whitespace-nowrap"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {t("generating")}
                  </span>
                ) : (
                  `${t("generate")} ✨`
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Sample prompts */}
        <div className="mt-3 flex flex-wrap gap-2 justify-center">
          <span className="text-xs text-gray-500">{t("tryLabel")}</span>
          {samplePrompts.slice(0, 4).map((p) => (
            <button
              key={p}
              onClick={() => setPrompt(p)}
              className="text-xs px-3 py-1 rounded-full bg-surface border border-surface-border text-gray-400 hover:text-neon-purple hover:border-neon-purple/50 transition-all"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center"
        >
          {error}
        </motion.div>
      )}

      {/* Loading shimmer */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-surface border border-surface-border overflow-hidden"
              >
                <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full border-3 border-neon-purple/30 border-t-neon-purple animate-spin" />
                  <span className="text-xs text-gray-500">{t("creatingDesign", { number: i + 1 })}</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {designs.length > 0 && !isGenerating && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{t("resultsHeading")}</h3>
              <span className="text-xs text-gray-400">
                {t("promptLabel")} &ldquo;{prompt}&rdquo;
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {designs.map((design, i) => (
                <motion.div
                  key={design.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setActiveDesign(activeDesign === i ? null : i)}
                  className={`relative aspect-square rounded-2xl bg-surface border border-surface-border cursor-pointer group overflow-hidden card-hover ${
                    activeDesign === i ? "ring-2 ring-neon-purple glow-purple" : ""
                  }`}
                >
                  {!loadedImages.has(i) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-surface z-10">
                      <div className="w-8 h-8 rounded-full border-2 border-neon-purple/30 border-t-neon-purple animate-spin" />
                    </div>
                  )}

                  <Image
                    src={design.url}
                    alt={design.title}
                    fill
                    className="object-cover"
                    onLoad={() => handleImageLoad(i)}
                    unoptimized
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-end p-3 opacity-0 group-hover:opacity-100 z-20">
                    <span className="text-white text-xs font-semibold mb-2">{design.title}</span>
                    <div className="flex gap-1">
                      <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-neon-purple to-neon-pink text-white text-[10px] font-bold hover:scale-105 transition-transform">
                        {t("buyPrice")}
                      </button>
                      <button className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white text-[10px] border border-white/20 hover:bg-white/20 transition-colors">
                        {t("addToStore")}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={handleGenerate}
                className="text-sm text-neon-purple hover:text-neon-pink transition-colors font-medium"
              >
                🔄 {t("regenerate")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
