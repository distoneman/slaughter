SELECT * FROM k_schedule WHERE animal_type = $(animalType)
    AND waitlist_flag = true 
    AND sched_date > $(schedDate) 
    AND (sched_status = 'Confirmed'
    OR sched_status = 'Scheduled')
ORDER BY sched_date, cust_name;