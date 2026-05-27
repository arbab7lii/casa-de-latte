import type { MenuItem } from "@/types/menu";

export const DEFAULT_SYRUP_PRICES = {
  vanilla: 20,
  hazelnut: 25,
  chocolate: 25,
  caramel: 25,
  extraEspresso: 40,
} as const;

export const SYRUP_OPTIONS = [
  { id: "vanilla", label: "Vanilla" },
  { id: "hazelnut", label: "Hazelnut" },
  { id: "chocolate", label: "Chocolate" },
  { id: "caramel", label: "Caramel" },
  { id: "extraEspresso", label: "Extra Espresso Shot" },
] as const;

export type SyrupOptionId = (typeof SYRUP_OPTIONS)[number]["id"];
export type SyrupOptionLabel = (typeof SYRUP_OPTIONS)[number]["label"];

export function resolveSyrupPrices(
  item: Pick<
    MenuItem,
    | "requiresSyrupOptions"
    | "syrupVanillaPrice"
    | "syrupHazelnutPrice"
    | "syrupChocolatePrice"
    | "syrupCaramelPrice"
    | "syrupExtraEspressoPrice"
    | "syrupVanillaVisible"
    | "syrupHazelnutVisible"
    | "syrupChocolateVisible"
    | "syrupCaramelVisible"
    | "syrupExtraEspressoVisible"
  >
) {
  if (!item.requiresSyrupOptions) return null;
  return {
    vanilla: Number(item.syrupVanillaPrice ?? DEFAULT_SYRUP_PRICES.vanilla),
    hazelnut: Number(item.syrupHazelnutPrice ?? DEFAULT_SYRUP_PRICES.hazelnut),
    chocolate: Number(item.syrupChocolatePrice ?? DEFAULT_SYRUP_PRICES.chocolate),
    caramel: Number(item.syrupCaramelPrice ?? DEFAULT_SYRUP_PRICES.caramel),
    extraEspresso: Number(
      item.syrupExtraEspressoPrice ?? DEFAULT_SYRUP_PRICES.extraEspresso
    ),
  };
}

export function getVisibleSyrupOptions(
  item: Pick<
    MenuItem,
    | "requiresSyrupOptions"
    | "syrupVanillaPrice"
    | "syrupHazelnutPrice"
    | "syrupChocolatePrice"
    | "syrupCaramelPrice"
    | "syrupExtraEspressoPrice"
    | "syrupVanillaVisible"
    | "syrupHazelnutVisible"
    | "syrupChocolateVisible"
    | "syrupCaramelVisible"
    | "syrupExtraEspressoVisible"
  >
) {
  const prices = resolveSyrupPrices(item);
  if (!prices) return [];

  const visibleById: Record<SyrupOptionId, boolean> = {
    vanilla: item.syrupVanillaVisible !== false,
    hazelnut: item.syrupHazelnutVisible !== false,
    chocolate: item.syrupChocolateVisible !== false,
    caramel: item.syrupCaramelVisible !== false,
    extraEspresso: item.syrupExtraEspressoVisible !== false,
  };

  return SYRUP_OPTIONS.filter((o) => visibleById[o.id]).map((o) => ({
    id: o.id,
    name: o.label,
    surcharge: syrupPriceForId(o.id, prices),
  }));
}

export function syrupPriceForId(
  id: SyrupOptionId,
  prices: Record<SyrupOptionId, number>
): number {
  return prices[id] ?? 0;
}

export function syrupSurchargeTotal(
  selected: SyrupOptionLabel[],
  prices: Record<SyrupOptionId, number> | null,
  visibleOptions: readonly { id: SyrupOptionId; label: SyrupOptionLabel }[] = SYRUP_OPTIONS
): number {
  if (!prices || selected.length === 0) return 0;
  return visibleOptions.filter((o) => selected.includes(o.label)).reduce(
    (sum, o) => sum + syrupPriceForId(o.id, prices),
    0
  );
}

export function formatSyrupSurcharge(amount: number): string {
  return `+₹${amount}`;
}
