"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { GAME_ASSETS } from "@/constants/assets";

interface CoinProps {
  value: number;
  onDrop: (value: number) => void;
  dropZoneRef: React.RefObject<HTMLDivElement | null>;
}

const COIN_META: Record<
  number,
  { bg: string; border: string; size: string; label: string; imgKey: keyof typeof GAME_ASSETS.MONEY }
> = {
  10:   { bg: "bg-amber-600", border: "border-amber-800", size: "w-12 h-12", label: "10円",   imgKey: "C10" },
  50:   { bg: "bg-gray-300",  border: "border-gray-500",  size: "w-12 h-12", label: "50円",   imgKey: "C50" },
  100:  { bg: "bg-amber-400", border: "border-amber-600", size: "w-14 h-14", label: "100円",  imgKey: "C100" },
  500:  { bg: "bg-amber-200", border: "border-amber-500", size: "w-16 h-16", label: "500円",  imgKey: "C500" },
  1000: { bg: "bg-green-200", border: "border-green-500", size: "w-20 h-12", label: "1000円", imgKey: "B1000" },
};

export default function Coin({ value, onDrop, dropZoneRef }: CoinProps) {
  const meta = COIN_META[value] ?? COIN_META[100];
  const coinRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  const imgUrl = GAME_ASSETS.MONEY[meta.imgKey];

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

  return (
    <motion.div
      ref={coinRef}
      drag
      dragSnapToOrigin
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      onClick={() => onDrop(value)}
      whileHover={{ scale: 1.1 }}
      whileDrag={{ scale: 1.15, zIndex: 50 }}
      className={`
        ${meta.size} flex items-center justify-center
        cursor-grab active:cursor-grabbing shadow-lg select-none
        ${imgError ? `${meta.bg} ${meta.border} border-4 ${value === 1000 ? "rounded-xl" : "rounded-full"}` : ""}
      `}
    >
      {!imgError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imgUrl}
          alt={`${meta.label}コイン`}
          onError={() => setImgError(true)}
          draggable={false}
          className={`w-full h-full object-contain ${value === 1000 ? "rounded-xl" : "rounded-full"}`}
        />
      ) : (
        <span className="text-xs font-black leading-tight text-center text-white">
          {meta.label}
        </span>
      )}
    </motion.div>
  );
}
