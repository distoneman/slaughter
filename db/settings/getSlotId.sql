SELECT * FROM k_slots 
WHERE slot_date = $(schedDate) 
AND animal_type = $(animalType);
