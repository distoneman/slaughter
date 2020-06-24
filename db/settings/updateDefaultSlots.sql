UPDATE k_monthly_defaults 
SET default_max_slots = $(maxSlots)
WHERE id = $(id);
