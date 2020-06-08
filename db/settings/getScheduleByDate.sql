SELECT * FROM k_schedule
WHERE sched_date = $(schedDate) AND animal_type = $(animalType) AND sched_status != 'Replaced'
ORDER BY cust_name, sched_id;