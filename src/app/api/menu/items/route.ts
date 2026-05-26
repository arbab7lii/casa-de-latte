import { NextResponse } from "next/server";
import { requireAdminSupabase } from "@/lib/admin-api";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

export async function POST(request: Request) {
  const auth = await requireAdminSupabase();
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.error === "Unauthorized" ? 401 : 403 });
  }

  try {
    const body = await request.json();
    const {
      id,
      categoryId,
      name,
      price,
      description = "",
      ingredients = [],
      isHotAvailable = false,
      isColdAvailable = false,
      requiresMilkCustomization = false,
      milkWholePrice = 0,
      milkAlmondPrice = 35,
      requiresSyrupOptions = false,
      syrupVanillaPrice = 20,
      syrupHazelnutPrice = 25,
      syrupChocolatePrice = 25,
      syrupCaramelPrice = 25,
      syrupExtraEspressoPrice = 40,
      requiresRoastProfile = false,
      isAvailable = true,
      sortOrder = 0,
    } = body;

    if (!categoryId || !name || price == null) {
      return NextResponse.json({ error: "categoryId, name, and price are required." }, { status: 400 });
    }

    const itemId = id || `${slugify(name)}-${Date.now().toString(36)}`;

    const row = {
      id: itemId,
      category_id: categoryId,
      name: String(name).trim(),
      price: Number(price),
      description: String(description),
      ingredients: Array.isArray(ingredients) ? ingredients : [],
      is_hot_available: Boolean(isHotAvailable),
      is_cold_available: Boolean(isColdAvailable),
      requires_milk_customization: Boolean(requiresMilkCustomization),
      milk_whole_price: Number(milkWholePrice) || 0,
      milk_almond_price: Number.isFinite(Number(milkAlmondPrice))
        ? Number(milkAlmondPrice)
        : 35,
      requires_syrup_options: Boolean(requiresSyrupOptions),
      syrup_vanilla_price: Number(syrupVanillaPrice) || 0,
      syrup_hazelnut_price: Number.isFinite(Number(syrupHazelnutPrice))
        ? Number(syrupHazelnutPrice)
        : 25,
      syrup_chocolate_price: Number.isFinite(Number(syrupChocolatePrice))
        ? Number(syrupChocolatePrice)
        : 25,
      syrup_caramel_price: Number.isFinite(Number(syrupCaramelPrice))
        ? Number(syrupCaramelPrice)
        : 25,
      syrup_extra_espresso_price: Number.isFinite(Number(syrupExtraEspressoPrice))
        ? Number(syrupExtraEspressoPrice)
        : 40,
      requires_roast_profile: Boolean(requiresRoastProfile),
      is_available: Boolean(isAvailable),
      sort_order: Number(sortOrder) || 0,
    };

    let { data, error } = await auth.supabase.from("menu_items").insert(row).select().single();
    if (error?.message?.match(/requires_syrup_options|syrup_|column/i)) {
      const {
        requires_syrup_options: _rs,
        syrup_vanilla_price: _sv,
        syrup_hazelnut_price: _sh,
        syrup_chocolate_price: _sc,
        syrup_caramel_price: _sca,
        syrup_extra_espresso_price: _se,
        ...withoutSyrup
      } = row;
      ({ data, error } = await auth.supabase
        .from("menu_items")
        .insert(withoutSyrup)
        .select()
        .single());
    }
    if (error?.message?.match(/milk_whole_price|milk_almond_price|column/i)) {
      const { milk_whole_price: _w, milk_almond_price: _a, ...withoutMilk } = row;
      ({ data, error } = await auth.supabase.from("menu_items").insert(withoutMilk).select().single());
    }

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to create menu item.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
