"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { useGame } from "@/context/GameContext";
import { useStamps } from "@/hooks/useStamps";

export default function ResultScreen() {
  const { resetGame } = useGame();
  const { earnedStamp, totalCount } = useStamps();
  const [showStamp, setShowStamp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowStamp(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-6 w-full max-w-md mx-auto py-6 text-center"
    >
      {/* 赤いフラッシュオーバーレイ */}
      <motion.div
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-red-500 pointer-events-none z-10"
      />

      {/* 花火エフェクト */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.6 }}
        className="text-6xl"
      >
        🎉
      </motion.div>

      {/* クリアメッセージ */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-4xl font-black text-orange-600">おつかいかんりょう！</h2>
        <p className="text-gray-600 mt-2 text-lg">よくできました！✨</p>
      </motion.div>

      {/* スタンプ獲得演出 */}
      {earnedStamp && showStamp && (
        <motion.div
          initial={{ scale: 3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex flex-col items-center gap-3 bg-yellow-50 rounded-3xl border-4 border-yellow-300 p-8 w-full"
        >
          <p className="text-sm font-bold text-yellow-700">スタンプゲット！</p>
          <div className="text-8xl">{earnedStamp.emoji}</div>
          <p className="text-xl font-black text-gray-700">{earnedStamp.name}</p>
          <p className="text-sm text-gray-500">
            これで {totalCount}こ めのスタンプ！
          </p>
        </motion.div>
      )}

      {!earnedStamp && showStamp && (
        <div className="text-gray-400 text-sm">スタンプをよみこみちゅう...</div>
      )}

      {/* アクションボタン */}
      <div className="flex flex-col gap-3 w-full">
        <Button
          variant="primary"
          size="xl"
          onClick={resetGame}
          className="w-full"
        >
          🔄 もういちど あそぶ
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => (window.location.href = "/stamps")}
          className="w-full"
        >
          📖 スタンプちょうをみる
        </Button>
      </div>
    </motion.div>
  );
}
