SELECT id, slot_date, animal_type, TO_CHAR(slot_date, 'MM') as month
    FROM k_slots
    WHERE  (TO_CHAR(slot_date, 'MM') = $(month))
        AND (animal_type LIKE $(animalType))
        AND (TO_CHAR(slot_date, 'YYYY') = $(year));
