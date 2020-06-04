SELECT * FROM k_schedule 
    WHERE (sched_date >= now()) 
        AND (cust_name LIKE $(name) 
        AND (sched_status != 'Replaced')
        OR UPPER(cust_name) LIKE UPPER($(name)))
    ORDER BY sched_date;