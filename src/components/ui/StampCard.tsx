"use client";

import { motion } from "framer-motion";
import type { Stamp } from "@/context/types";

interface StampCardProps {
  stamp: Stamp;
  isNew?: boolean;
  index?: number;
}

export default function StampCard({
  stamp,
  isNew = false,
  index = 0,
}: StampCardProps) {
  const date = new Date(stamp.earnedAt);
  const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;

  return (
    <motion.div
      initial={isNew ? { scale: 3, opacity: 0 } : { scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={
        isNew
          ? { type: "spring", stiffness: 300, damping: 20, delay: 0.3 }
          : { delay: index * 0.05 }
      }
      className="flex flex-col items-center gap-1"
    >
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-100 to-orange-100 border-4 border-orange-300 flex items-center justify-center text-4xl shadow-md">
        {stamp.emoji}
      </div>
      <p className="text-xs font-bold text-gray-600 text-center leading-tight">
        {stamp.name}
      </p>
      <p className="text-xs text-gray-400">{dateStr}</p>
    </motion.div>
  );
}
