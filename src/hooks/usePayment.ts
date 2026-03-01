"use client";

import { useGame } from "@/context/GameContext";
import { DIFFICULTY_CONFIG } from "@/constants/difficulty";

/**
 * 支払いロジックを提供するhook
 */
export function usePayment() {
  const { state, dispatch, completeMission } = useGame();

  const totalPrice = state.mission?.totalPrice ?? 0;
  const paidAmount = state.paidAmount;
  const change = paidAmount - totalPrice;
  const isEnough = paidAmount >= totalPrice;
  const isExact = paidAmount === totalPrice;

  const availableCoins = DIFFICULTY_CONFIG[state.difficulty].coinDenominations;

  const addCoin = (value: number) => {
    dispatch({ type: "ADD_COIN", payload: value });
  };

  const removeCoin = (value: number) => {
    dispatch({ type: "REMOVE_COIN", payload: value });
  };

  const resetPayment = () => {
    dispatch({ type: "ADD_COIN", payload: -paidAmount }); // reset to 0
  };

  const confirmPayment = () => {
    if (isEnough) {
      completeMission();
    }
  };

  return {
    totalPrice,
    paidAmount,
    change,
    isEnough,
    isExact,
    availableCoins,
    addCoin,
    removeCoin,
    resetPayment,
    confirmPayment,
  };
}
