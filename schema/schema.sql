CREATE TABLE k_schedule(
    sched_id serial PRIMARY KEY,
    sched_date DATE,
    animal_type VARCHAR(20),
    cust_name VARCHAR(150),
    cust_phone VARCHAR(30),
    sched_status VARCHAR(25),
    status_change_date DATE,
    cancelled_by VARCHAR(75),
    notes VARCHAR(250));

CREATE TABLE k_slots(
    id serial PRIMARY KEY,
    slot_date DATE,
    animal_type VARCHAR(20),
    max_slots NUMERIC(10,0),
    used_slots NUMERIC(10,0),
    notes VARCHAR(250));
    
CREATE TABLE k_animal_type(
    id serial PRIMARY KEY,
    animal_type VARCHAR(25));
    
CREATE TABLE k_sched_status(
    status_id serial PRIMARY KEY,
    sched_status VARCHAR(50));

CREATE TABLE k_monthly_defaults(
    id serial PRIMARY KEY,
    animal_type VARCHAR(20),
    kill_month VARCHAR(25),
    default_max_slots NUMERIC(10,0)
    );
