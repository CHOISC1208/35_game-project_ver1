"use client";

import { useGame } from "@/context/GameContext";
import type { MissionProduct } from "@/context/types";

/**
 * ミッション関連のロジックを提供するhook
 */
export function useMission() {
  const { state, dispatch } = useGame();

  const mission = state.mission;

  // 選択商品の合計数量
  const selectedCount = state.selectedProducts.reduce(
    (sum, sp) => sum + sp.quantity,
    0
  );

  // ミッション必要数量合計
  const requiredCount = mission?.products.reduce(
    (sum, mp) => sum + mp.quantity,
    0
  ) ?? 0;

  // 各商品が正しく選択されているか確認
  const isProductCorrect = (mp: MissionProduct): boolean => {
    const selected = state.selectedProducts.find(
      (sp) => sp.product.id === mp.product.id
    );
    return selected?.quantity === mp.quantity;
  };

  // 全商品が正しく選択されているか
  const isSelectionComplete = mission?.products.every(isProductCorrect) ?? false;

  const selectProduct = (mp: MissionProduct) => {
    dispatch({ type: "SELECT_PRODUCT", payload: mp });
  };

  const removeProduct = (productId: string) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: productId });
  };

  // 選択された商品の数量を取得
  const getSelectedQuantity = (productId: string): number => {
    return (
      state.selectedProducts.find((sp) => sp.product.id === productId)
        ?.quantity ?? 0
    );
  };

  return {
    mission,
    selectedProducts: state.selectedProducts,
    selectedCount,
    requiredCount,
    isSelectionComplete,
    isProductCorrect,
    selectProduct,
    removeProduct,
    getSelectedQuantity,
  };
}
