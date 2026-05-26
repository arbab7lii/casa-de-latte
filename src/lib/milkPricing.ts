import type { MenuItem } from "@/types/menu";

export const DEFAULT_MILK_WHOLE_PRICE = 0;
export const DEFAULT_MILK_ALMOND_PRICE = 35;

export const MILK_OPTIONS = [
  { id: "whole", label: "Whole Milk" },
  { id: "almond", label: "Almond Milk" },
] as const;

export type MilkOptionLabel = (typeof MILK_OPTIONS)[number]["label"];

export function resolveMilkPrices(item: Pick<
  MenuItem,
  "requiresMilkCustomization" | "milkWholePrice" | "milkAlmondPrice"
>) {
  if (!item.requiresMilkCustomization) return null;
  return {
    whole: Number(item.milkWholePrice ?? DEFAULT_MILK_WHOLE_PRICE),
    almond: Number(item.milkAlmondPrice ?? DEFAULT_MILK_ALMOND_PRICE),
  };
}

export function milkSurchargeForChoice(
  choice: MilkOptionLabel | null,
  prices: { whole: number; almond: number } | null
): number {
  if (!choice || !prices) return 0;
  if (choice === "Whole Milk") return prices.whole;
  if (choice === "Almond Milk") return prices.almond;
  return 0;
}

export function formatMilkSurcharge(amount: number): string {
  return `+₹${amount}`;
}
