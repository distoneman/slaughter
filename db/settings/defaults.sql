SELECT *
FROM k_monthly_defaults 
WHERE animal_type = $(animalType) AND month_num = $(month_num)
ORDER BY month_num;