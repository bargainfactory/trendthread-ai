"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  icon: string;
}

const stats: Stat[] = [
  { label: "Designs Generated", value: 2470000, suffix: "+", icon: "🎨" },
  { label: "Active Creators", value: 45200, suffix: "+", icon: "✨" },
  { label: "Orders Shipped", value: 890000, suffix: "+", icon: "📦" },
  { label: "Creator Payouts", value: 3200000, suffix: "+", prefix: "$", icon: "💰" },
];

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

function AnimatedNumber({ stat }: { stat: Stat }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = stat.value;
    const duration = 2000;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-3xl mb-2">{stat.icon}</div>
      <div className="text-3xl sm:text-4xl font-bold text-white">
        {stat.prefix}
        {formatNumber(count)}
        {stat.suffix}
      </div>
      <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
    </motion.div>
  );
}

export default function StatsCounter() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
      {stats.map((stat) => (
        <AnimatedNumber key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
