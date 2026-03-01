# 📱 おつかいタイマー（Otsukai Timer）

**お買い物 × 算数 × 時計** の知育ゲームアプリ

**対象年齢：** 4歳〜8歳の子ども・保護者

---

## ゲーム概要

キャラクター（ママ）から「○時までに◯◯を買ってきて！」というミッションを受け取り、
商品選びとお会計を通じて **時計の読み方** と **お金の計算** を楽しく学べるアプリです。

### ゲームフロー

```
[Home] → [Briefing] → [Market] → [Checkout] → [Result]
  ↑__________________（もう一度あそぶ）______________|
```

| 画面 | 内容 |
|---|---|
| **Home** | 難易度選択（かんたん / ふつう / むずかしい）＋スタート |
| **Briefing** | ミッション提示（アナログ時計で制限時間を確認） |
| **Market** | 商品棚から指定商品を選んで買い物袋へ |
| **Checkout** | コインをドラッグ&タップしてレジへ投入、お支払い |
| **Result** | クリアのスタンプ獲得演出 |

---

## 技術スタック

| 項目 | 採用技術 |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| 画像ホスティング | Cloudinary |
| 状態管理 | React Context + useReducer |
| 永続化 | localStorage |

---

## セットアップ

```bash
# 依存インストール
npm install

# 開発サーバー起動
npm run dev
# → http://localhost:3000

# プロダクションビルド
npm run build
npm start
```

---

## ディレクトリ構造

```
src/
├── app/
│   ├── layout.tsx           # GameProvider ラッパー
│   ├── page.tsx             # ホーム画面
│   ├── game/page.tsx        # ゲーム画面（screen state で切替）
│   └── stamps/page.tsx      # スタンプ帳
├── components/
│   ├── Clock/Clock.tsx      # SVG アナログ時計
│   ├── Register/
│   │   ├── Register.tsx     # レジ（ドロップゾーン）
│   │   ├── Coin.tsx         # ドラッグ可能なコイン
│   │   └── CoinTray.tsx     # コイン一覧トレイ
│   ├── Shop/
│   │   ├── Shop.tsx         # 商品棚 + 買い物袋レイアウト
│   │   ├── ProductCard.tsx  # 商品カード
│   │   └── ShoppingBag.tsx  # 買い物袋
│   ├── screens/             # 各ゲーム画面
│   │   ├── BriefingScreen.tsx
│   │   ├── MarketScreen.tsx
│   │   ├── CheckoutScreen.tsx
│   │   └── ResultScreen.tsx
│   └── ui/
│       ├── Button.tsx
│       └── StampCard.tsx
├── constants/
│   ├── assets.ts            # ★ 全画像 URL を一元管理（Cloudinary）
│   ├── missions.ts          # 商品カタログ
│   └── difficulty.ts        # 難易度設定
├── context/
│   ├── GameContext.tsx      # useReducer + localStorage 永続化
│   └── types.ts             # TypeScript 型定義
├── hooks/
│   ├── useMission.ts
│   ├── usePayment.ts
│   └── useStamps.ts
└── lib/
    ├── missionGenerator.ts  # ミッション生成（pure function）
    └── clockHelpers.ts      # SVG 時計の角度計算（pure function）
```

---

## 画像アセット管理

画像はすべて Cloudinary から配信しています。
`src/constants/assets.ts` の URL のみ変更すれば、再ビルドなしに差し替え可能です。

```typescript
// URL 生成ユーティリティ
const BASE = "https://res.cloudinary.com/dsuvr4yh8/image/upload/otsukai-timer";
export const getAssetUrl = (category: string, name: string) =>
  `${BASE}/${category}/${name}.png`;

// カテゴリ構成
GAME_ASSETS.MONEY      // /money/  — 10yen, 50yen, 100yen, 500yen, 1000yen
GAME_ASSETS.ITEMS      // /items/  — bread, milk, apple, ...
GAME_ASSETS.CHARACTERS // /characters/ — mom, shopkeeper
GAME_ASSETS.STAMPS     // /stamps/ — ufo_cat, rainbow_fish, ...
GAME_ASSETS.UI         // /ui/     — shop_bg, home_bg, clock_bg
```

画像読み込み失敗時は絵文字フォールバックを表示します。

---

## 難易度

| 難易度 | 商品数 | 使えるコイン | 分の刻み |
|---|---|---|---|
| かんたん | 1〜2個 | 10円・100円 | 30分 |
| ふつう | 2〜3個 | 10〜500円 | 15分 |
| むずかしい | 3〜4個 | 全コイン + お釣り | 5分 |

---

## スタンプ

ミッションクリアごとにユニークなスタンプを1枚獲得。
`/stamps` ページのスタンプ帳に蓄積されます（localStorage 保存）。

---

## 拡張予定

- 新しいステージ（お菓子屋・八百屋・宇宙など）
- 限定スタンプパック
- 保護者向け設定画面（難易度カスタム）
- サウンドエフェクト

---

## 要件定義

`requirements/ver1.0.0/` に各バージョンの要件定義書を管理しています。
