"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import StampCard from "@/components/ui/StampCard";
import { useStamps } from "@/hooks/useStamps";

export default function StampsPage() {
  const { stamps, totalCount } = useStamps();

  return (
    <div className="w-full py-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/"
          className="text-gray-400 hover:text-gray-600 text-sm font-bold"
        >
          ← もどる
        </Link>
        <h1 className="text-2xl font-black text-gray-700">📖 スタンプちょう</h1>
      </div>

      {/* スタンプ数 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-yellow-50 rounded-2xl border-4 border-yellow-300 p-4 text-center mb-6"
      >
        <p className="text-gray-600 text-sm">あつめたスタンプ</p>
        <p className="text-5xl font-black text-orange-600">{totalCount}</p>
        <p className="text-gray-500 text-sm">こ</p>
      </motion.div>

      {/* スタンプ一覧 */}
      {stamps.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-400 font-bold text-lg">まだスタンプがありません</p>
          <p className="text-gray-400 text-sm mt-2">おつかいをクリアしてスタンプをあつめよう！</p>
          <Link
            href="/"
            className="mt-6 inline-block text-orange-500 underline font-bold"
          >
            おつかいをはじめる →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {stamps.map((stamp, index) => (
            <StampCard key={stamp.id} stamp={stamp} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
