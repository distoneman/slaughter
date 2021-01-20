UPDATE k_slots set 
    cancelled_slots = (cancelled_slots - 1)
    WHERE id = $(slotId);