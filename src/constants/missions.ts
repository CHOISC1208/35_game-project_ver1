import type { Product } from "@/context/types";
import { PRODUCT_URLS } from "./assets";

export const PRODUCTS: Product[] = [
  {
    id: "bread",
    name: "パン",
    price: 120,
    imageUrl: PRODUCT_URLS.bread,
    emoji: "🍞",
  },
  {
    id: "milk",
    name: "ぎゅうにゅう",
    price: 150,
    imageUrl: PRODUCT_URLS.milk,
    emoji: "🥛",
  },
  {
    id: "apple",
    name: "りんご",
    price: 100,
    imageUrl: PRODUCT_URLS.apple,
    emoji: "🍎",
  },
  {
    id: "banana",
    name: "バナナ",
    price: 80,
    imageUrl: PRODUCT_URLS.banana,
    emoji: "🍌",
  },
  {
    id: "egg",
    name: "たまご",
    price: 200,
    imageUrl: PRODUCT_URLS.egg,
    emoji: "🥚",
  },
  {
    id: "juice",
    name: "ジュース",
    price: 130,
    imageUrl: PRODUCT_URLS.juice,
    emoji: "🧃",
  },
  {
    id: "cookie",
    name: "クッキー",
    price: 90,
    imageUrl: PRODUCT_URLS.cookie,
    emoji: "🍪",
  },
  {
    id: "chocolate",
    name: "チョコレート",
    price: 110,
    imageUrl: PRODUCT_URLS.chocolate,
    emoji: "🍫",
  },
  {
    id: "icecream",
    name: "アイスクリーム",
    price: 180,
    imageUrl: PRODUCT_URLS.icecream,
    emoji: "🍦",
  },
  {
    id: "candy",
    name: "あめ",
    price: 50,
    imageUrl: PRODUCT_URLS.candy,
    emoji: "🍬",
  },
];

export const STAMPS_CATALOG = [
  { id: "ufo_cat", name: "UFOねこ", emoji: "🐱" },
  { id: "rainbow_fish", name: "にじのさかな", emoji: "🐟" },
  { id: "star_rabbit", name: "ほしウサギ", emoji: "🐰" },
  { id: "cloud_dog", name: "くものいぬ", emoji: "🐶" },
  { id: "pizza_dragon", name: "ピザりゅう", emoji: "🐉" },
  { id: "curry_elephant", name: "カレーぞう", emoji: "🐘" },
  { id: "noodle_penguin", name: "ラーメンペンギン", emoji: "🐧" },
  { id: "donut_bear", name: "ドーナツくま", emoji: "🐻" },
];
