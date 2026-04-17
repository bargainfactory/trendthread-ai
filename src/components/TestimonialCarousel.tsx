"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/mock-data";

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="overflow-hidden relative min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-2xl p-8 text-center"
          >
            <div className="text-4xl mb-4">{testimonials[current].avatar}</div>
            <p className="text-lg text-gray-200 mb-4 italic leading-relaxed">
              &ldquo;{testimonials[current].text}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-sm">
                  ★
                </span>
              ))}
            </div>
            <p className="font-semibold text-white">
              {testimonials[current].name}
            </p>
            <p className="text-sm text-gray-400">
              {testimonials[current].role}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 bg-gradient-to-r from-neon-purple to-neon-pink"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
