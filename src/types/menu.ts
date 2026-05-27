export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  ingredients: string[];
  category: string;
  isHotAvailable?: boolean;
  isColdAvailable?: boolean;
  requiresMilkCustomization?: boolean;
  /** INR surcharge when Whole Milk is selected (menu item must enable milk options). */
  milkWholePrice?: number;
  /** INR surcharge when Almond Milk is selected. */
  milkAlmondPrice?: number;
  requiresSyrupOptions?: boolean;
  syrupVanillaPrice?: number;
  syrupHazelnutPrice?: number;
  syrupChocolatePrice?: number;
  syrupCaramelPrice?: number;
  syrupExtraEspressoPrice?: number;
  syrupVanillaVisible?: boolean;
  syrupHazelnutVisible?: boolean;
  syrupChocolateVisible?: boolean;
  syrupCaramelVisible?: boolean;
  syrupExtraEspressoVisible?: boolean;
  requiresRoastProfile?: boolean;
  isAvailable?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
}
