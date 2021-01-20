UPDATE k_schedule 
SET sched_status = 'Cancelled', status_change_date = $(statusDate),
    waitlist_flag = false,
    cancelled_by = $(cancelledBy)
WHERE sched_id = $(id);

UPDATE k_slots set 
    cancelled_slots = (cancelled_slots + 1)
    WHERE id = $(slotId);

SELECT * FROM k_schedule
WHERE sched_date = $(schedDate) 
AND animal_type = $(animalType) 
AND sched_status != 'Replaced'
ORDER BY cust_name, sched_id;
