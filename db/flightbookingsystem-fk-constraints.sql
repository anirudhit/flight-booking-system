-- Adding constraints

-- (t_users)
--ALTER TABLE t_users ADD CONSTRAINT t_users_user_role_id_fk
--FOREIGN KEY (role_id) REFERENCES t_user_roles(id);

-- (t_user_pwds)
--ALTER TABLE t_user_pwds ADD CONSTRAINT t_user_pwds_user_id_fk
--FOREIGN KEY (user_id) REFERENCES t_users(id);

-- (t_flight_schedule)
ALTER TABLE t_flight_schedule ADD CONSTRAINT t_flight_schedule_arrival_id_fk
FOREIGN KEY (arrival_id) REFERENCES t_airports(id);

ALTER TABLE t_flight_schedule ADD CONSTRAINT t_flight_schedule_departure_id_fk
FOREIGN KEY (departure_id) REFERENCES t_airports(id);

ALTER TABLE t_flight_schedule ADD CONSTRAINT t_flight_schedule_flight_id_fk
FOREIGN KEY (flight_id) REFERENCES t_flights(id);

-- (t_flight_booking)
ALTER TABLE t_flight_bookings ADD CONSTRAINT t_flight_booking_schedule_id_fk
FOREIGN KEY (flight_schedule_id) REFERENCES t_flight_schedules(id);

-- (t_passenger)
ALTER TABLE t_passengers ADD CONSTRAINT t_passenger_booking_id_fk
FOREIGN KEY (flight_booking_id) REFERENCES t_flight_bookings(id);