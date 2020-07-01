DELETE from k_schedule WHERE sched_id = $(id);
UPDATE k_slots SET used_slots = used_slots - 1
WHERE id = $(slotId);

SELECT * FROM k_schedule
WHERE sched_date = $(schedDate) 
AND animal_type = $(animalType) 
AND sched_status != 'Replaced'
ORDER BY cust_name, sched_id;