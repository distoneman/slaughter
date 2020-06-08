INSERT INTO k_schedule (k_slots_id, sched_date, animal_type, cust_name, cust_phone, sched_status,
    status_change_date, waitlist_flag, notes)
    VAlUES ($(slotId), $(schedDate), $(animalType), $(custName), $(custPhone), 'Confirmed', NOW(), false, $(notes));

UPDATE k_schedule SET sched_status = 'Replaced', status_change_date = NOW()
WHERE sched_id = $(replaceId);

UPDATE k_schedule SET sched_status = 'Cancelled', status_change_date = NOW(), waitlist_flag = false
WHERE sched_id = $(schedId);