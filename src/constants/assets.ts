// ============================================================
// 全画像URLの一元管理
// Cloudinary から配信 — URLのみ変更で全画像を差し替え可能
// ============================================================

const BASE_PATH =
  "https://res.cloudinary.com/dsuvr4yh8/image/upload/otsukai-timer";

export const getAssetUrl = (category: string, name: string): string =>
  `${BASE_PATH}/${category}/${name}.png`;

// ============================================================
// GAME_ASSETS — カテゴリ別の一覧
// ============================================================
export const GAME_ASSETS = {
  MONEY: {
    C10: getAssetUrl("money", "10yen"),
    C50: getAssetUrl("money", "50yen"),
    C100: getAssetUrl("money", "100yen"),
    C500: getAssetUrl("money", "500yen"),
    B1000: getAssetUrl("money", "1000yen"),
  },
  ITEMS: {
    bread: getAssetUrl("items", "bread"),
    milk: getAssetUrl("items", "milk"),
    apple: getAssetUrl("items", "apple"),
    banana: getAssetUrl("items", "banana"),
    egg: getAssetUrl("items", "egg"),
    juice: getAssetUrl("items", "juice"),
    cookie: getAssetUrl("items", "cookie"),
    chocolate: getAssetUrl("items", "chocolate"),
    icecream: getAssetUrl("items", "icecream"),
    candy: getAssetUrl("items", "candy"),
  },
  CHARACTERS: {
    mom: getAssetUrl("characters", "mom"),
    shopkeeper: getAssetUrl("characters", "shopkeeper"),
  },
  UI: {
    shopBg: getAssetUrl("ui", "shop_bg"),
    homeBg: getAssetUrl("ui", "home_bg"),
    clockBg: getAssetUrl("ui", "clock_bg"),
  },
  STAMPS: {
    ufo_cat: getAssetUrl("stamps", "ufo_cat"),
    rainbow_fish: getAssetUrl("stamps", "rainbow_fish"),
    star_rabbit: getAssetUrl("stamps", "star_rabbit"),
    cloud_dog: getAssetUrl("stamps", "cloud_dog"),
    pizza_dragon: getAssetUrl("stamps", "pizza_dragon"),
    curry_elephant: getAssetUrl("stamps", "curry_elephant"),
    noodle_penguin: getAssetUrl("stamps", "noodle_penguin"),
    donut_bear: getAssetUrl("stamps", "donut_bear"),
  },
};

// ============================================================
// 後方互換エクスポート（既存コードからの参照を維持）
// ============================================================

export const CHARACTER_URLS = GAME_ASSETS.CHARACTERS;

export const PRODUCT_URLS: Record<string, string> = GAME_ASSETS.ITEMS;

export const COIN_URLS = {
  coin10: GAME_ASSETS.MONEY.C10,
  coin50: GAME_ASSETS.MONEY.C50,
  coin100: GAME_ASSETS.MONEY.C100,
  coin500: GAME_ASSETS.MONEY.C500,
  bill1000: GAME_ASSETS.MONEY.B1000,
};

export const STAMP_URLS: Record<string, string> = GAME_ASSETS.STAMPS;

export const BG_URLS = {
  shop: GAME_ASSETS.UI.shopBg,
  home: GAME_ASSETS.UI.homeBg,
};
