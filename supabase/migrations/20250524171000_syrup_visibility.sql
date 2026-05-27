-- Syrup visibility controls per menu item
ALTER TABLE menu_items
  ADD COLUMN IF NOT EXISTS syrup_vanilla_visible BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS syrup_hazelnut_visible BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS syrup_chocolate_visible BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS syrup_caramel_visible BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS syrup_extra_espresso_visible BOOLEAN NOT NULL DEFAULT true;

