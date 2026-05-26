-- Per-item milk option surcharges (Whole / Almond)
ALTER TABLE menu_items
  ADD COLUMN IF NOT EXISTS milk_whole_price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS milk_almond_price NUMERIC(10, 2) NOT NULL DEFAULT 35;

COMMENT ON COLUMN menu_items.milk_whole_price IS 'Surcharge in INR when customer selects Whole Milk';
COMMENT ON COLUMN menu_items.milk_almond_price IS 'Surcharge in INR when customer selects Almond Milk';
