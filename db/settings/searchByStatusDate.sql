SELECT * FROM k_schedule 
    WHERE (sched_date >= now()) 
        AND (status_change_date = $(statusDate))
        AND ((sched_status != 'Replaced') 
        AND (sched_status != 'Cancelled'))
    ORDER BY animal_type, cust_name, sched_date;