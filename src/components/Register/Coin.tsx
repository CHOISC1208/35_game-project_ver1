"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

interface CoinProps {
  value: number;
  onDrop: (value: number) => void;
  dropZoneRef: React.RefObject<HTMLDivElement | null>;
}

const COIN_STYLES: Record<number, { bg: string; border: string; size: string; label: string }> = {
  10: { bg: "bg-amber-600", border: "border-amber-800", size: "w-12 h-12", label: "10" },
  50: { bg: "bg-gray-300", border: "border-gray-500", size: "w-12 h-12", label: "50" },
  100: { bg: "bg-amber-400", border: "border-amber-600", size: "w-14 h-14", label: "100" },
  500: { bg: "bg-amber-200", border: "border-amber-500", size: "w-16 h-16", label: "500" },
  1000: { bg: "bg-green-200", border: "border-green-500", size: "w-20 h-12", label: "1000円" },
};

export default function Coin({ value, onDrop, dropZoneRef }: CoinProps) {
  const style = COIN_STYLES[value] ?? COIN_STYLES[100];
  const coinRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (
    _: unknown,
    info: { point: { x: number; y: number } }
  ) => {
    if (!dropZoneRef.current) return;
    const rect = dropZoneRef.current.getBoundingClientRect();
    const { x, y } = info.point;
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      onDrop(value);
    }
  };

  const handleClick = () => {
    onDrop(value);
  };

  return (
    <motion.div
      ref={coinRef}
      drag
      dragSnapToOrigin
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileDrag={{ scale: 1.15, zIndex: 50 }}
      className={`
        ${style.bg} ${style.border} ${style.size}
        border-4 rounded-full flex items-center justify-center
        text-white font-bold text-sm cursor-grab active:cursor-grabbing
        shadow-lg select-none
        ${value === 1000 ? "rounded-xl" : "rounded-full"}
      `}
    >
      <span className="text-xs font-black leading-tight text-center">
        {style.label}
        {value !== 1000 && <span className="block text-xs">円</span>}
      </span>
    </motion.div>
  );
}
