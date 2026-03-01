"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useGame } from "@/context/GameContext";
import { useRouter } from "next/navigation";
import { DIFFICULTY_CONFIG } from "@/constants/difficulty";
import type { Difficulty } from "@/context/types";

export default function HomePage() {
  const { state, startGame, setDifficulty } = useGame();
  const router = useRouter();

  const handleStart = () => {
    startGame();
    router.push("/game");
  };

  const difficulties: Difficulty[] = ["easy", "normal", "hard"];

  return (
    <div className="flex flex-col items-center gap-8 py-8 min-h-screen">
      {/* タイトル */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="text-7xl mb-4">🛒</div>
        <h1 className="text-4xl font-black text-orange-600 leading-tight">
          おつかい
          <br />
          タイマー
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          おかいもの × さんすう × とけい
        </p>
      </motion.div>

      {/* 難易度選択 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-sm space-y-3"
      >
        <p className="text-center font-bold text-gray-600">むずかしさをえらんでね</p>
        {difficulties.map((d) => {
          const config = DIFFICULTY_CONFIG[d];
          const isSelected = state.difficulty === d;
          return (
            <motion.button
              key={d}
              whileTap={{ scale: 0.97 }}
              onClick={() => setDifficulty(d)}
              className={`
                w-full p-4 rounded-2xl border-4 text-left transition-all
                ${isSelected
                  ? "border-orange-400 bg-orange-50 shadow-md"
                  : "border-gray-200 bg-white hover:border-orange-200"
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-black text-lg text-gray-800">
                    {config.label}
                  </span>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {config.description}
                  </p>
                </div>
                {isSelected && (
                  <span className="text-2xl">✅</span>
                )}
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* スタートボタン */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-sm"
      >
        <Button
          variant="primary"
          size="xl"
          onClick={handleStart}
          className="w-full"
        >
          🎮 おつかいをはじめる！
        </Button>
      </motion.div>

      {/* スタンプ帳リンク */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Link
          href="/stamps"
          className="text-teal-600 underline font-bold text-sm hover:text-teal-700"
        >
          📖 スタンプちょうをみる
        </Link>
      </motion.div>
    </div>
  );
}
