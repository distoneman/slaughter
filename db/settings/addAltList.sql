INSERT INTO k_alt_list (
    added_date, 
    animal_type,
    total_animals, 
    cust_name, 
    cust_phone, 
    status, 
    notes)
VALUES (
    $(addDate), 
    $(animalType), 
    $(totalAnimals),
    $(custName), 
    $(custPhone), 
    'Active', 
    $(notes));