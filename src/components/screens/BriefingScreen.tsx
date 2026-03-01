"use client";

import { motion } from "framer-motion";
import Clock from "@/components/Clock/Clock";
import Button from "@/components/ui/Button";
import { useGame } from "@/context/GameContext";

export default function BriefingScreen() {
  const { state, advanceScreen } = useGame();
  const { mission } = state;

  if (!mission) return null;

  const { targetTime, products, totalPrice } = mission;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto py-4">
      {/* キャラクター吹き出し */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-yellow-50 rounded-3xl border-4 border-yellow-300 p-5 relative"
      >
        <div className="absolute -top-4 left-6 text-5xl">👩</div>
        <div className="pt-6">
          <p className="text-lg font-bold text-yellow-800 leading-relaxed">
            ちょっとおつかいをたのんでもいい？
          </p>
          <div className="mt-3 space-y-2">
            {products.map((mp) => (
              <div key={mp.product.id} className="flex items-center gap-2">
                <span className="text-2xl">{mp.product.emoji}</span>
                <span className="font-bold text-gray-800">
                  {mp.product.name} を {mp.quantity}こ
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-gray-600 text-sm">
            ぜんぶで <span className="font-black text-orange-600 text-lg">{totalPrice}円</span> だよ！
          </p>
        </div>
      </motion.div>

      {/* 時計 */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex flex-col items-center gap-3 bg-blue-50 rounded-3xl border-4 border-blue-200 p-6 w-full"
      >
        <p className="font-bold text-blue-700 text-lg">
          ⏰ この じかんまでに かえってきてね！
        </p>
        <Clock hour={targetTime.hour} minute={targetTime.minute} size={180} />
        <p className="text-blue-600 text-sm">
          {targetTime.hour % 12 === 0 ? 12 : targetTime.hour % 12}時
          {targetTime.minute > 0 ? `${targetTime.minute}分` : ""} まで
        </p>
      </motion.div>

      {/* ミッション確認 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full"
      >
        <Button
          variant="primary"
          size="xl"
          onClick={advanceScreen}
          className="w-full"
        >
          🛒 おかいものに いく！
        </Button>
      </motion.div>
    </div>
  );
}
