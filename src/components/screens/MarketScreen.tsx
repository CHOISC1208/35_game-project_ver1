"use client";

import { motion } from "framer-motion";
import Shop from "@/components/Shop/Shop";
import { useGame } from "@/context/GameContext";

export default function MarketScreen() {
  const { state } = useGame();
  const { mission } = state;

  if (!mission) return null;

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full pb-8"
    >
      {/* ミッション目標バー */}
      <div className="mb-4 bg-teal-50 rounded-2xl border-4 border-teal-300 p-3 flex flex-wrap gap-3 items-center justify-center">
        <span className="text-sm font-bold text-teal-700">かうもの：</span>
        {mission.products.map((mp) => (
          <div
            key={mp.product.id}
            className="flex items-center gap-1 bg-white rounded-xl px-3 py-1 border-2 border-teal-200"
          >
            <span className="text-xl">{mp.product.emoji}</span>
            <span className="text-sm font-bold text-gray-700">
              {mp.product.name}×{mp.quantity}
            </span>
          </div>
        ))}
      </div>

      <Shop />
    </motion.div>
  );
}
