INSERT INTO 
`flightbookingsystem`.`t_genders` 
(`id`, `name`, `createdAt`, `updatedAt`)
VALUES 
(1, 'male', now(), now()),
(2, 'female', now(), now()),
(3, 'other', now(), now());


select * from t_genders;

desc t_genders;

select * from t_airports;

select * from t_flight_schedules;

select distinct departure_id from t_flight_schedules;
-- To get scheduled departures
select id,name,code,country_code,city from t_airports where id
IN (select distinct departure_id from t_flight_schedules);

-- To get scheduled arrivals
select id,name,code,country_code,city from t_airports where id
IN (select distinct arrival_id from t_flight_schedules where departure_id = 1);


