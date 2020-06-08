UPDATE k_schedule 
SET sched_status = 'Confirmed',
    status_change_date = Now()
WHERE sched_id = $(id);

SELECT * FROM k_schedule
WHERE sched_date = $(schedDate) 
AND animal_type = $(animalType) 
AND sched_status != 'Replaced';
