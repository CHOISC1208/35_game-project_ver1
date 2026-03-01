"use client";

import { useGame } from "@/context/GameContext";

/**
 * スタンプ帳ロジックを提供するhook
 */
export function useStamps() {
  const { state } = useGame();

  const stamps = state.stamps;
  const earnedStamp = state.earnedStamp;
  const totalCount = stamps.length;

  // 最新から並べ替え
  const sortedStamps = [...stamps].sort(
    (a, b) => new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime()
  );

  return {
    stamps: sortedStamps,
    earnedStamp,
    totalCount,
  };
}
