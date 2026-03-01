"use client";

import Coin from "./Coin";

interface CoinTrayProps {
  denominations: number[];
  onDrop: (value: number) => void;
  dropZoneRef: React.RefObject<HTMLDivElement | null>;
}

export default function CoinTray({
  denominations,
  onDrop,
  dropZoneRef,
}: CoinTrayProps) {
  return (
    <div className="bg-amber-50 rounded-2xl border-4 border-amber-200 p-4">
      <p className="text-sm font-bold text-amber-700 text-center mb-3">
        💰 おかね（タップかドラッグ）
      </p>
      <div className="flex flex-wrap gap-3 justify-center items-center">
        {denominations.map((value) => (
          <Coin key={value} value={value} onDrop={onDrop} dropZoneRef={dropZoneRef} />
        ))}
      </div>
    </div>
  );
}
