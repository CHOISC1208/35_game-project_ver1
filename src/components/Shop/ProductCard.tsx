"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/context/types";

interface ProductCardProps {
  product: Product;
  requiredQuantity: number;
  selectedQuantity: number;
  onSelect: () => void;
}

export default function ProductCard({
  product,
  requiredQuantity,
  selectedQuantity,
  onSelect,
}: ProductCardProps) {
  const isRequired = requiredQuantity > 0;
  const isComplete = selectedQuantity >= requiredQuantity && isRequired;
  const isOver = selectedQuantity > requiredQuantity && isRequired;
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onSelect}
      className={`
        relative cursor-pointer rounded-2xl border-4 p-3 text-center
        transition-colors duration-150 select-none
        ${isComplete && !isOver
          ? "border-green-400 bg-green-50"
          : isRequired
          ? "border-orange-300 bg-orange-50"
          : "border-gray-200 bg-white"
        }
        ${isOver ? "border-red-400 bg-red-50" : ""}
      `}
    >
      {/* 商品画像（失敗時は絵文字フォールバック） */}
      <div className="w-14 h-14 mx-auto mb-1 flex items-center justify-center">
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-contain"
          />
        ) : (
          <span className="text-5xl">{product.emoji}</span>
        )}
      </div>

      {/* 商品名 */}
      <p className="text-xs font-bold text-gray-700 mb-1">{product.name}</p>

      {/* 値段 */}
      <p className="text-sm font-black text-orange-600">{product.price}円</p>

      {/* 必要数バッジ */}
      {isRequired && (
        <div className="mt-2 flex items-center justify-center gap-1">
          <span className="text-xs text-gray-500">
            {selectedQuantity}/{requiredQuantity}こ
          </span>
        </div>
      )}

      {/* 完了チェック */}
      {isComplete && !isOver && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow"
        >
          ✓
        </motion.div>
      )}
    </motion.div>
  );
}
