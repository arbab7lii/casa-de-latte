-- Optional syrup add-ons per menu item
ALTER TABLE menu_items
  ADD COLUMN IF NOT EXISTS requires_syrup_options BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS syrup_vanilla_price NUMERIC(10, 2) NOT NULL DEFAULT 20,
  ADD COLUMN IF NOT EXISTS syrup_hazelnut_price NUMERIC(10, 2) NOT NULL DEFAULT 25,
  ADD COLUMN IF NOT EXISTS syrup_chocolate_price NUMERIC(10, 2) NOT NULL DEFAULT 25,
  ADD COLUMN IF NOT EXISTS syrup_caramel_price NUMERIC(10, 2) NOT NULL DEFAULT 25,
  ADD COLUMN IF NOT EXISTS syrup_extra_espresso_price NUMERIC(10, 2) NOT NULL DEFAULT 40;
