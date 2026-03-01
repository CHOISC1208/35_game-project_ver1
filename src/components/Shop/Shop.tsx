"use client";

import ProductCard from "./ProductCard";
import ShoppingBag from "./ShoppingBag";
import Button from "@/components/ui/Button";
import { useMission } from "@/hooks/useMission";
import { useGame } from "@/context/GameContext";
import { PRODUCTS } from "@/constants/missions";

export default function Shop() {
  const { mission, selectedProducts, isSelectionComplete, selectProduct, removeProduct, getSelectedQuantity } = useMission();
  const { advanceScreen } = useGame();

  if (!mission) return null;

  // ミッションに含まれる商品IDのセット
  const requiredProductIds = new Set(mission.products.map((mp) => mp.product.id));

  // ミッション商品を先に、その後その他商品（デコイ）
  const missionProducts = mission.products.map((mp) => mp.product);
  const decoyProducts = PRODUCTS.filter((p) => !requiredProductIds.has(p.id))
    .slice(0, 4); // デコイは最大4個
  const displayProducts = [...missionProducts, ...decoyProducts];

  const getRequiredQty = (productId: string) => {
    return mission.products.find((mp) => mp.product.id === productId)?.quantity ?? 0;
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
      {/* ヘッダー */}
      <div className="bg-orange-100 rounded-2xl p-4 border-4 border-orange-300">
        <h2 className="text-lg font-black text-orange-700 text-center">
          🏪 おみせ
        </h2>
        <p className="text-sm text-orange-600 text-center mt-1">
          ミッションのしょうひんをえらんでね！
        </p>
      </div>

      {/* 商品棚 */}
      <div className="grid grid-cols-3 gap-3">
        {displayProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            requiredQuantity={getRequiredQty(product.id)}
            selectedQuantity={getSelectedQuantity(product.id)}
            onSelect={() =>
              selectProduct({ product, quantity: 1 })
            }
          />
        ))}
      </div>

      {/* 買い物袋 */}
      <ShoppingBag
        selectedProducts={selectedProducts}
        onRemove={removeProduct}
      />

      {/* 次へボタン */}
      <Button
        variant="primary"
        size="xl"
        onClick={advanceScreen}
        disabled={!isSelectionComplete}
        className="w-full"
      >
        {isSelectionComplete ? "💳 レジへいく！" : "もっとえらんでね"}
      </Button>
    </div>
  );
}
