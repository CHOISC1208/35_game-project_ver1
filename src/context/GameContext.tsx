"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import type { GameState, GameAction, Difficulty, Stamp } from "./types";
import { generateMission, generateStamp } from "@/lib/missionGenerator";

// ============================================================
// 初期状態
// ============================================================
const initialState: GameState = {
  screen: "home",
  difficulty: "easy",
  mission: null,
  selectedProducts: [],
  paidAmount: 0,
  earnedStamp: null,
  stamps: [],
};

// ============================================================
// Reducer
// ============================================================
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_GAME": {
      const mission = generateMission(state.difficulty);
      return {
        ...state,
        screen: "briefing",
        mission,
        selectedProducts: [],
        paidAmount: 0,
        earnedStamp: null,
      };
    }

    case "ADVANCE_SCREEN": {
      const screenOrder: GameState["screen"][] = [
        "home",
        "briefing",
        "market",
        "checkout",
        "result",
      ];
      const currentIndex = screenOrder.indexOf(state.screen);
      const nextScreen = screenOrder[currentIndex + 1] ?? "home";
      return { ...state, screen: nextScreen };
    }

    case "SET_DIFFICULTY":
      return { ...state, difficulty: action.payload };

    case "SET_MISSION":
      return { ...state, mission: action.payload };

    case "SELECT_PRODUCT": {
      const existing = state.selectedProducts.find(
        (sp) => sp.product.id === action.payload.product.id
      );
      if (existing) {
        return {
          ...state,
          selectedProducts: state.selectedProducts.map((sp) =>
            sp.product.id === action.payload.product.id
              ? { ...sp, quantity: sp.quantity + 1 }
              : sp
          ),
        };
      }
      return {
        ...state,
        selectedProducts: [...state.selectedProducts, action.payload],
      };
    }

    case "REMOVE_PRODUCT": {
      const existing = state.selectedProducts.find(
        (sp) => sp.product.id === action.payload
      );
      if (!existing) return state;
      if (existing.quantity <= 1) {
        return {
          ...state,
          selectedProducts: state.selectedProducts.filter(
            (sp) => sp.product.id !== action.payload
          ),
        };
      }
      return {
        ...state,
        selectedProducts: state.selectedProducts.map((sp) =>
          sp.product.id === action.payload
            ? { ...sp, quantity: sp.quantity - 1 }
            : sp
        ),
      };
    }

    case "ADD_COIN":
      return { ...state, paidAmount: state.paidAmount + action.payload };

    case "REMOVE_COIN":
      return {
        ...state,
        paidAmount: Math.max(0, state.paidAmount - action.payload),
      };

    case "COMPLETE_MISSION": {
      const newStamps = [...state.stamps, action.payload];
      return {
        ...state,
        screen: "result",
        earnedStamp: action.payload,
        stamps: newStamps,
      };
    }

    case "RESET_GAME":
      return {
        ...initialState,
        difficulty: state.difficulty,
        stamps: state.stamps,
      };

    case "LOAD_STAMPS":
      return { ...state, stamps: action.payload };

    default:
      return state;
  }
}

// ============================================================
// Context
// ============================================================
interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  startGame: () => void;
  advanceScreen: () => void;
  setDifficulty: (d: Difficulty) => void;
  completeMission: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

const STAMPS_STORAGE_KEY = "otsukai_stamps_v1";

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // マウント時にlocalStorageからスタンプを読み込む
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STAMPS_STORAGE_KEY);
      if (raw) {
        const stamps: Stamp[] = JSON.parse(raw);
        dispatch({ type: "LOAD_STAMPS", payload: stamps });
      }
    } catch {
      // localStorage未対応環境では無視
    }
  }, []);

  // stamps変更時にlocalStorageへ保存
  useEffect(() => {
    try {
      localStorage.setItem(STAMPS_STORAGE_KEY, JSON.stringify(state.stamps));
    } catch {
      // ignore
    }
  }, [state.stamps]);

  const startGame = useCallback(() => dispatch({ type: "START_GAME" }), []);
  const advanceScreen = useCallback(
    () => dispatch({ type: "ADVANCE_SCREEN" }),
    []
  );
  const setDifficulty = useCallback(
    (d: Difficulty) => dispatch({ type: "SET_DIFFICULTY", payload: d }),
    []
  );
  const completeMission = useCallback(() => {
    const stamp = generateStamp(state.stamps.map((s) => s.id));
    dispatch({ type: "COMPLETE_MISSION", payload: stamp });
  }, [state.stamps]);
  const resetGame = useCallback(() => dispatch({ type: "RESET_GAME" }), []);

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        startGame,
        advanceScreen,
        setDifficulty,
        completeMission,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
