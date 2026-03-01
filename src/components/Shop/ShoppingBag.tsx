"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { MissionProduct } from "@/context/types";

interface ShoppingBagProps {
  selectedProducts: MissionProduct[];
  onRemove: (productId: string) => void;
}

export default function ShoppingBag({
  selectedProducts,
  onRemove,
}: ShoppingBagProps) {
  return (
    <div className="bg-amber-50 rounded-2xl border-4 border-amber-300 p-4 min-h-32">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🛍️</span>
        <h3 className="font-bold text-amber-700">かいものぶくろ</h3>
      </div>

      {selectedProducts.length === 0 ? (
        <p className="text-center text-gray-400 text-sm py-4">
          しょうひんをえらんでね
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          <AnimatePresence>
            {selectedProducts.map((sp) => (
              <motion.div
                key={sp.product.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                className="flex items-center justify-between bg-white rounded-xl px-3 py-2 border-2 border-amber-200"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{sp.product.emoji}</span>
                  <span className="text-sm font-bold text-gray-700">
                    {sp.product.name}
                  </span>
                  <span className="text-xs text-gray-500">×{sp.quantity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-orange-600">
                    {sp.product.price * sp.quantity}円
                  </span>
                  <button
                    onClick={() => onRemove(sp.product.id)}
                    className="w-6 h-6 rounded-full bg-red-100 text-red-500 text-xs font-bold hover:bg-red-200 transition-colors"
                  >
                    ×
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
