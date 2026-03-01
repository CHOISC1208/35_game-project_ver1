"use client";

import { timeToAngles, handEndpoint, tickEndpoints } from "@/lib/clockHelpers";

interface ClockProps {
  hour: number;
  minute: number;
  size?: number;
  showDigital?: boolean;
}

export default function Clock({
  hour,
  minute,
  size = 200,
  showDigital = true,
}: ClockProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 8;
  const { hourAngle, minuteAngle } = timeToAngles(hour, minute);

  const hourHand = handEndpoint(cx, cy, hourAngle, r * 0.55);
  const minuteHand = handEndpoint(cx, cy, minuteAngle, r * 0.8);

  const ticks = Array.from({ length: 60 }, (_, i) => {
    const isMajor = i % 5 === 0;
    const outerR = r;
    const innerR = isMajor ? r - size * 0.07 : r - size * 0.04;
    return { ...tickEndpoints(cx, cy, i, outerR, innerR), isMajor };
  });

  const hourNumbers = Array.from({ length: 12 }, (_, i) => {
    const num = i + 1;
    const angleDeg = num * 30;
    const pos = handEndpoint(cx, cy, angleDeg, r * 0.72);
    return { num, ...pos };
  });

  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  const displayMinute = String(minute).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* 文字盤 */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="#FFFDF5"
          stroke="#FFB347"
          strokeWidth={size * 0.025}
        />

        {/* 目盛り */}
        {ticks.map((tick, i) => (
          <line
            key={i}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke={tick.isMajor ? "#8B4513" : "#CCC"}
            strokeWidth={tick.isMajor ? size * 0.012 : size * 0.005}
            strokeLinecap="round"
          />
        ))}

        {/* 数字 */}
        {hourNumbers.map(({ num, x, y }) => (
          <text
            key={num}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={size * 0.085}
            fontWeight="bold"
            fill="#5D3A1A"
            fontFamily="sans-serif"
          >
            {num}
          </text>
        ))}

        {/* 時針 */}
        <line
          x1={cx}
          y1={cy}
          x2={hourHand.x}
          y2={hourHand.y}
          stroke="#FF6B35"
          strokeWidth={size * 0.045}
          strokeLinecap="round"
        />

        {/* 分針 */}
        <line
          x1={cx}
          y1={cy}
          x2={minuteHand.x}
          y2={minuteHand.y}
          stroke="#4ECDC4"
          strokeWidth={size * 0.03}
          strokeLinecap="round"
        />

        {/* 中心点 */}
        <circle cx={cx} cy={cy} r={size * 0.04} fill="#FF6B35" />
      </svg>

      {showDigital && (
        <div className="text-2xl font-bold text-orange-600 bg-orange-50 px-4 py-1 rounded-full border-2 border-orange-300">
          {displayHour}:{displayMinute}
        </div>
      )}
    </div>
  );
}
