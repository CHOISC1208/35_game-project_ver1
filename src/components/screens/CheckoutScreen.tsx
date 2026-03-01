"use client";

import { motion } from "framer-motion";
import Register from "@/components/Register/Register";
import { useGame } from "@/context/GameContext";

export default function CheckoutScreen() {
  const { state } = useGame();
  const { mission, selectedProducts } = state;

  if (!mission) return null;

  const total = selectedProducts.reduce(
    (sum, sp) => sum + sp.product.price * sp.quantity,
    0
  );

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full pb-8"
    >
      {/* ヘッダー */}
      <div className="mb-4 text-center">
        <div className="text-5xl mb-2">🏪</div>
        <h2 className="text-2xl font-black text-gray-700">レジ</h2>
        <p className="text-gray-500 text-sm">おかねをいれてね！</p>
      </div>

      {/* 選択した商品の確認 */}
      <div className="mb-4 bg-gray-50 rounded-2xl border-4 border-gray-200 p-4">
        <h3 className="text-sm font-bold text-gray-600 mb-2">かったもの：</h3>
        <div className="flex flex-wrap gap-2">
          {selectedProducts.map((sp) => (
            <div
              key={sp.product.id}
              className="flex items-center gap-1 bg-white rounded-xl px-2 py-1 border-2 border-gray-200"
            >
              <span className="text-lg">{sp.product.emoji}</span>
              <span className="text-xs font-bold text-gray-600">
                {sp.product.name}×{sp.quantity}
              </span>
              <span className="text-xs text-orange-600 font-bold">
                {sp.product.price * sp.quantity}円
              </span>
            </div>
          ))}
        </div>
        {total !== mission.totalPrice && (
          <p className="mt-2 text-xs text-orange-500">
            ※ミッション金額: {mission.totalPrice}円
          </p>
        )}
      </div>

      <Register />
    </motion.div>
  );
}
