// ============================================================
// 全画像URLの一元管理
// 将来Cloudinaryに差し替える場合はここのURLのみ変更する
// ============================================================

const PH = (text: string, w = 200, h = 200) =>
  `https://placehold.co/${w}x${h}/FFE4B5/8B4513.png?text=${encodeURIComponent(text)}`;

// キャラクター
export const CHARACTER_URLS = {
  mom: PH("ママ", 150, 150),
  shopkeeper: PH("店員", 150, 150),
};

// 商品
export const PRODUCT_URLS = {
  bread: PH("パン", 120, 120),
  milk: PH("牛乳", 120, 120),
  apple: PH("りんご", 120, 120),
  banana: PH("バナナ", 120, 120),
  egg: PH("たまご", 120, 120),
  juice: PH("ジュース", 120, 120),
  cookie: PH("クッキー", 120, 120),
  chocolate: PH("チョコ", 120, 120),
  icecream: PH("アイス", 120, 120),
  candy: PH("あめ", 120, 120),
};

// コイン
export const COIN_URLS = {
  coin10: PH("10円", 80, 80),
  coin50: PH("50円", 80, 80),
  coin100: PH("100円", 80, 80),
  coin500: PH("500円", 80, 80),
  bill1000: PH("1000円", 100, 60),
};

// スタンプ
export const STAMP_URLS: Record<string, string> = {
  ufo_cat: PH("UFO猫", 160, 160),
  rainbow_fish: PH("虹の魚", 160, 160),
  star_rabbit: PH("星ウサギ", 160, 160),
  cloud_dog: PH("雲犬", 160, 160),
  pizza_dragon: PH("ピザ竜", 160, 160),
  curry_elephant: PH("カレー象", 160, 160),
  noodle_penguin: PH("ラーメン鳥", 160, 160),
  donut_bear: PH("ドーナツ熊", 160, 160),
};

// 背景
export const BG_URLS = {
  shop: PH("お店", 800, 400),
  home: PH("おうち", 800, 400),
};
