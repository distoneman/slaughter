UPDATE k_alt_list SET
    status = 'Removed'
WHERE alt_id = $(id);

SELECT * FROM k_alt_list
WHERE (status = 'Active')
    AND (animal_type = $(searchAnimalType))
ORDER BY added_date;
