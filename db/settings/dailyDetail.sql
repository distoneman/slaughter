SELECT id, slot_date, animal_type, TO_CHAR(slot_date, 'MM') as month,
    max_slots, used_slots
    FROM k_slots
    WHERE  (TO_CHAR(slot_date, 'MM') = $(month))
        AND (animal_type LIKE $(animalType))
        AND (TO_CHAR(slot_date, 'YYYY') = $(year));
