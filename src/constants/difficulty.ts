import type { Difficulty } from "@/context/types";

export interface DifficultyConfig {
  label: string;
  description: string;
  maxItems: number;
  maxPrice: number;
  coinDenominations: number[];
  timeOptions: { hour: number; minute: number }[];
  minuteStep: number;
}

export const DIFFICULTY_CONFIG: Record<Difficulty, DifficultyConfig> = {
  easy: {
    label: "かんたん",
    description: "1〜2こ、10円・100円のみ",
    maxItems: 2,
    maxPrice: 200,
    coinDenominations: [10, 100],
    timeOptions: [
      { hour: 2, minute: 0 },
      { hour: 3, minute: 0 },
      { hour: 4, minute: 0 },
      { hour: 10, minute: 0 },
      { hour: 11, minute: 0 },
    ],
    minuteStep: 30,
  },
  normal: {
    label: "ふつう",
    description: "2〜3こ、10〜500円",
    maxItems: 3,
    maxPrice: 500,
    coinDenominations: [10, 50, 100, 500],
    timeOptions: [
      { hour: 2, minute: 30 },
      { hour: 3, minute: 30 },
      { hour: 4, minute: 30 },
      { hour: 10, minute: 30 },
      { hour: 11, minute: 30 },
    ],
    minuteStep: 15,
  },
  hard: {
    label: "むずかしい",
    description: "3〜4こ、全コイン＋お釣り",
    maxItems: 4,
    maxPrice: 1000,
    coinDenominations: [10, 50, 100, 500, 1000],
    timeOptions: [
      { hour: 2, minute: 15 },
      { hour: 3, minute: 45 },
      { hour: 4, minute: 15 },
      { hour: 10, minute: 45 },
      { hour: 11, minute: 15 },
    ],
    minuteStep: 5,
  },
};
