SELECT * FROM k_schedule
WHERE k_slots_id = $(id) AND sched_status != 'Replaced';