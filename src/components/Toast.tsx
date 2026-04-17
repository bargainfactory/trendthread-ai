"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";

export default function Toast() {
  const { toast } = useCart();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 50, x: "-50%" }}
          className="fixed bottom-6 left-1/2 z-[60] px-6 py-3 rounded-2xl glass-strong glow-purple"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">🛒</span>
            <span className="text-sm font-medium text-white">{toast}</span>
            <span className="text-green-400">✓</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
