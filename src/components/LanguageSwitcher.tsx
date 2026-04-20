"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const languages: { code: Locale; flag: string; name: string; nativeName: string }[] = [
  { code: "en", flag: "🇺🇸", name: "English", nativeName: "English" },
  { code: "es", flag: "🇪🇸", name: "Spanish", nativeName: "Español" },
  { code: "fr", flag: "🇫🇷", name: "French", nativeName: "Français" },
  { code: "de", flag: "🇩🇪", name: "German", nativeName: "Deutsch" },
  { code: "pt", flag: "🇧🇷", name: "Portuguese", nativeName: "Português" },
  { code: "ja", flag: "🇯🇵", name: "Japanese", nativeName: "日本語" },
  { code: "ko", flag: "🇰🇷", name: "Korean", nativeName: "한국어" },
  { code: "zh", flag: "🇨🇳", name: "Chinese", nativeName: "中文" },
  { code: "ar", flag: "🇸🇦", name: "Arabic", nativeName: "العربية" },
  { code: "hi", flag: "🇮🇳", name: "Hindi", nativeName: "हिन्दी" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = languages.find((l) => l.code === locale) ?? languages[0];

  function switchLocale(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-surface-border transition-all text-sm"
        aria-label="Change language"
      >
        <span className="text-base">{currentLang.flag}</span>
        <span className="hidden sm:inline font-medium">{currentLang.nativeName}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 w-56 rounded-2xl bg-surface/95 backdrop-blur-xl border border-surface-border shadow-2xl shadow-black/40 overflow-hidden z-50"
          >
            <div className="px-3 pt-3 pb-2">
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold px-1">
                Select Language
              </p>
            </div>
            <div className="max-h-[320px] overflow-y-auto px-2 pb-2 space-y-0.5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-surface-border">
              {languages.map((lang) => {
                const isActive = locale === lang.code;
                return (
                  <motion.button
                    key={lang.code}
                    whileHover={{ x: 2 }}
                    onClick={() => switchLocale(lang.code)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center gap-3 ${
                      isActive
                        ? "bg-gradient-to-r from-neon-purple/20 to-neon-pink/10 border border-neon-purple/30"
                        : "text-gray-300 hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <span className="text-lg flex-shrink-0">{lang.flag}</span>
                    <div className="flex-1 min-w-0">
                      <span className={`block font-medium ${isActive ? "text-neon-purple" : "text-white"}`}>
                        {lang.nativeName}
                      </span>
                      <span className="block text-[11px] text-gray-500">{lang.name}</span>
                    </div>
                    {isActive && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex-shrink-0 w-5 h-5 rounded-full bg-neon-purple/20 flex items-center justify-center"
                      >
                        <svg className="w-3 h-3 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
