"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";
import BriefingScreen from "@/components/screens/BriefingScreen";
import MarketScreen from "@/components/screens/MarketScreen";
import CheckoutScreen from "@/components/screens/CheckoutScreen";
import ResultScreen from "@/components/screens/ResultScreen";

const SCREEN_LABELS: Record<string, string> = {
  briefing: "ミッション",
  market: "おかいもの",
  checkout: "レジ",
  result: "けっか",
};

const SCREEN_STEPS: Record<string, number> = {
  briefing: 1,
  market: 2,
  checkout: 3,
  result: 4,
};

export default function GamePage() {
  const { state, resetGame } = useGame();
  const router = useRouter();

  // ホーム画面にいる場合はリダイレクト
  useEffect(() => {
    if (state.screen === "home") {
      router.replace("/");
    }
  }, [state.screen, router]);

  if (state.screen === "home") return null;

  const step = SCREEN_STEPS[state.screen] ?? 1;
  const totalSteps = 4;

  return (
    <div className="w-full">
      {/* ヘッダー */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => {
            resetGame();
            router.push("/");
          }}
          className="text-gray-400 hover:text-gray-600 transition-colors text-sm font-bold"
        >
          ← もどる
        </button>
        <div className="flex-1">
          <div className="flex gap-1">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  i < step ? "bg-orange-400" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {SCREEN_LABELS[state.screen] ?? ""}
          </p>
        </div>
      </div>

      {/* 画面コンテンツ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={state.screen}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          {state.screen === "briefing" && <BriefingScreen />}
          {state.screen === "market" && <MarketScreen />}
          {state.screen === "checkout" && <CheckoutScreen />}
          {state.screen === "result" && <ResultScreen />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
