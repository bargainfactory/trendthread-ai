"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const samplePrompts = [
  "Cyberpunk cat in a neon city",
  "Retro sunset with palm trees",
  "Abstract geometric faces",
  "Kawaii space astronaut",
  "Glitch art butterfly wings",
  "Y2K chrome hearts pattern",
];

const mockDesigns = [
  { emoji: "🌌", gradient: "from-purple-600 via-pink-500 to-blue-500", title: "Neon Cosmos" },
  { emoji: "🐉", gradient: "from-red-500 via-orange-500 to-yellow-400", title: "Dragon Fire" },
  { emoji: "🦋", gradient: "from-cyan-400 via-violet-500 to-fuchsia-500", title: "Digital Flutter" },
  { emoji: "🌸", gradient: "from-pink-400 via-rose-400 to-purple-500", title: "Sakura Dream" },
];

export default function AIDesignGenerator() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeDesign, setActiveDesign] = useState<number | null>(null);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setShowResults(false);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 2000);
  };

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
              placeholder="Describe your dream design..."
              className="flex-1 px-5 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
            />
            <div className="flex gap-2 p-1">
              <button
                onClick={fillRandomPrompt}
                className="px-4 py-3 rounded-xl bg-surface-light text-gray-300 hover:text-white hover:bg-surface border border-surface-border transition-all text-sm"
              >
                🎲 Random
              </button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 whitespace-nowrap"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Generating...
                  </span>
                ) : (
                  "Generate ✨"
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Sample prompts */}
        <div className="mt-3 flex flex-wrap gap-2 justify-center">
          <span className="text-xs text-gray-500">Try:</span>
          {samplePrompts.slice(0, 3).map((p) => (
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
                className="aspect-square rounded-2xl bg-surface border border-surface-border overflow-hidden animate-shimmer"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-neon-purple/30 animate-pulse"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                Generated Designs
              </h3>
              <span className="text-xs text-gray-400">
                Based on: &ldquo;{prompt}&rdquo;
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockDesigns.map((design, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() =>
                    setActiveDesign(activeDesign === i ? null : i)
                  }
                  className={`relative aspect-square rounded-2xl bg-gradient-to-br ${design.gradient} flex items-center justify-center cursor-pointer group overflow-hidden card-hover ${
                    activeDesign === i ? "ring-2 ring-neon-purple glow-purple" : ""
                  }`}
                >
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {design.emoji}
                  </span>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex flex-col items-center justify-end p-3 opacity-0 group-hover:opacity-100">
                    <span className="text-white text-xs font-semibold mb-2">
                      {design.title}
                    </span>
                    <div className="flex gap-1">
                      <button className="px-3 py-1 rounded-lg bg-gradient-to-r from-neon-purple to-neon-pink text-white text-[10px] font-bold">
                        Buy $29.99
                      </button>
                      <button className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm text-white text-[10px] border border-white/20">
                        Add to Store
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
