SELECT * FROM k_schedule
WHERE k_slots_id = $(id) AND sched_status != 'Replaced'
ORDER BY cust_name, sched_id;