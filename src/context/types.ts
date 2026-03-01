// ============================================================
// 難易度
// ============================================================
export type Difficulty = "easy" | "normal" | "hard";

// ============================================================
// 商品
// ============================================================
export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  emoji: string;
}

// ============================================================
// ミッション
// ============================================================
export interface Mission {
  id: string;
  products: MissionProduct[];
  targetTime: { hour: number; minute: number };
  totalPrice: number;
  difficulty: Difficulty;
}

export interface MissionProduct {
  product: Product;
  quantity: number;
}

// ============================================================
// スタンプ
// ============================================================
export interface Stamp {
  id: string;
  name: string;
  imageUrl: string;
  emoji: string;
  earnedAt: string; // ISO date string
}

// ============================================================
// ゲーム画面
// ============================================================
export type Screen = "home" | "briefing" | "market" | "checkout" | "result";

// ============================================================
// ゲーム状態
// ============================================================
export interface GameState {
  screen: Screen;
  difficulty: Difficulty;
  mission: Mission | null;
  selectedProducts: MissionProduct[];
  paidAmount: number;
  earnedStamp: Stamp | null;
  stamps: Stamp[];
}

// ============================================================
// アクション
// ============================================================
export type GameAction =
  | { type: "START_GAME" }
  | { type: "ADVANCE_SCREEN" }
  | { type: "SET_DIFFICULTY"; payload: Difficulty }
  | { type: "SET_MISSION"; payload: Mission }
  | { type: "SELECT_PRODUCT"; payload: MissionProduct }
  | { type: "REMOVE_PRODUCT"; payload: string } // product id
  | { type: "ADD_COIN"; payload: number } // coin value
  | { type: "REMOVE_COIN"; payload: number } // coin value
  | { type: "COMPLETE_MISSION"; payload: Stamp }
  | { type: "RESET_GAME" }
  | { type: "LOAD_STAMPS"; payload: Stamp[] };
