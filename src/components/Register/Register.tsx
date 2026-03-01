"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CoinTray from "./CoinTray";
import Button from "@/components/ui/Button";
import { usePayment } from "@/hooks/usePayment";

export default function Register() {
  const {
    totalPrice,
    paidAmount,
    change,
    isEnough,
    availableCoins,
    addCoin,
    resetPayment,
    confirmPayment,
  } = usePayment();

  const dropZoneRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
      {/* 合計金額 */}
      <div className="bg-white rounded-2xl border-4 border-teal-300 p-4 text-center">
        <p className="text-sm font-bold text-teal-600">ぜんぶで</p>
        <p className="text-5xl font-black text-teal-700">{totalPrice}<span className="text-2xl">円</span></p>
      </div>

      {/* ドロップゾーン（レジ） */}
      <div
        ref={dropZoneRef}
        className={`
          min-h-24 rounded-2xl border-4 border-dashed p-4 transition-colors
          flex flex-col items-center justify-center gap-2
          ${paidAmount > 0 ? "border-green-400 bg-green-50" : "border-gray-300 bg-gray-50"}
        `}
      >
        <p className="text-xs font-bold text-gray-500">ここにいれる / ドロップ</p>
        <AnimatePresence>
          {paidAmount > 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <p className="text-3xl font-black text-green-700">
                {paidAmount}<span className="text-lg">円</span>
              </p>
              {isEnough && (
                <p className="text-sm text-green-600 font-bold">
                  おつり: {change}円
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* コイントレイ */}
      <CoinTray
        denominations={availableCoins}
        onDrop={addCoin}
        dropZoneRef={dropZoneRef}
      />

      {/* ボタン */}
      <div className="flex gap-3">
        <Button variant="ghost" onClick={resetPayment} size="md" className="flex-1">
          やりなおす
        </Button>
        <Button
          variant="primary"
          onClick={confirmPayment}
          size="lg"
          disabled={!isEnough}
          className="flex-2"
        >
          {isEnough ? "✅ はらう！" : `あと${totalPrice - paidAmount}円`}
        </Button>
      </div>
    </div>
  );
}
