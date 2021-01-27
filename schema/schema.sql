CREATE TABLE k_schedule(
    sched_id serial PRIMARY KEY,
    k_slots_id NUMERIC(15,0),
    sched_date DATE,
    animal_type VARCHAR(20),
    cust_name VARCHAR(150),
    cust_phone VARCHAR(30),
    sched_status VARCHAR(25),
    status_change_date DATE,
    cancelled_by VARCHAR(75),
    waitlist_flag BOOLEAN,
    notes VARCHAR(250));

CREATE TABLE k_slots(
    id serial PRIMARY KEY,
    slot_date DATE,
    animal_type VARCHAR(20),
    max_slots NUMERIC(10,0),
    used_slots NUMERIC(10,0),
    cancelled_slots NUMERIC(10,0) DEFAULT '0',
    notes VARCHAR(250));
    
CREATE TABLE k_monthly_defaults(
    id serial PRIMARY KEY,
    animal_type VARCHAR(20),
    kill_month VARCHAR(25),
    month_num NUMERIC(4,0),
    default_max_slots NUMERIC(10,0)
    );

CREATE TABLE k_alt_list(
    alt_id serial PRIMARY KEY,
    added_date DATE,
    removal_date DATE,
    animal_type VARCHAR(20),
    cust_name VARCHAR(150),
    cust_phone VARCHAR(30),
    status VARCHAR(25),
    notes VARCHAR(250)
    );

GRANT ALL PRIVILEGES ON TABLE k_alt_list TO circlev;    
GRANT ALL PRIVILEGES ON TABLE k_monthly_defaults TO circlev;
GRANT ALL PRIVILEGES ON TABLE k_schedule TO circlev;
GRANT ALL PRIVILEGES ON TABLE k_slots TO circlev;    
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO circlev;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO circlev;

INSERT INTO k_monthly_defaults (Animal_type, kill_month, month_num, default_max_slots)
VALUES  ('Beef', 'January', 1, 12),
        ('Pork', 'January', 1, 12),
        ('Sheep', 'January', 1, 2),
        ('Beef', 'February', 2, 12),
        ('Pork', 'February', 2, 12),
        ('Sheep', 'February', 2, 2),
        ('Beef', 'March', 3, 12),
        ('Pork', 'March', 3, 12),
        ('Sheep', 'March', 3, 2),
        ('Beef', 'April', 4, 12),
        ('Pork', 'April', 4, 12),
        ('Sheep', 'April', 4, 2),
        ('Beef', 'May', 5, 12),
        ('Pork', 'May', 5, 12),
        ('Sheep', 'May', 5, 2),
        ('Beef', 'June', 6, 12),
        ('Pork', 'June', 6, 12),
        ('Sheep', 'June', 6, 2),
        ('Beef', 'July', 7, 12),
        ('Pork', 'July', 7, 12),
        ('Sheep', 'July', 7, 2),
        ('Beef', 'August', 8, 12),
        ('Pork', 'August', 8, 12),
        ('Sheep', 'August', 8, 2),
        ('Beef', 'September', 9, 12),
        ('Pork', 'September', 9, 12),
        ('Sheep', 'September', 9, 2),
        ('Beef', 'October', 10, 12),
        ('Pork', 'October', 10, 12),
        ('Sheep', 'October', 10, 2),
        ('Beef', 'November', 11, 12),
        ('Pork', 'November', 11, 12),
        ('Sheep', 'November', 11, 2),        
        ('Beef', 'December', 12, 12),
        ('Pork', 'December', 12, 12),
        ('Sheep', 'December', 12, 2);
