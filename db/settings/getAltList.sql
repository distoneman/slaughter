SELECT * FROM k_alt_list
WHERE (status = 'Active')
    AND (animal_type = $(animalType))
ORDER BY added_date;
