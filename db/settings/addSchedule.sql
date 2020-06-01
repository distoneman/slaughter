UPDATE k_slots set 
    used_slots = (used_slots + 1)
    WHERE id = $(slotId);


INSERT INTO k_schedule (k_slots_id, sched_date, animal_type, cust_name, cust_phone, sched_status,
    status_change_date, waitlist_flag, notes)
    VAlUES ($(slotId), $(schedDate), $(animalType), $(custName), $(custPhone), $(schedStatus), $(changeDate), $(waitList), $(notes));