SELECT * FROM k_schedule 
    WHERE (sched_date >= now()) 
        AND (cust_phone LIKE $(phone))
        AND (sched_status != 'Replaced')
    ORDER BY cust_name, sched_date;