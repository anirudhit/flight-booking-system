INSERT INTO 
`flightbookingsystem`.`t_user_roles` 
(`id`, `role`, `createdAt`, `updatedAt`)
VALUES 
(1, 'admin', now(), now()),
(2, 'agent', now(), now()),
(3, 'user', now(), now());


INSERT INTO 
`flightbookingsystem`.`t_airports` 
(`id`, `name`, `code`, `country_code`, `city`, `createdAt`, `updatedAt`) 
VALUES 
(1, 'Huntsville International - Carl T. Jones Field', 'HSV', 'US', 'Huntsville', now(), now()),
(2, 'Jackson-evers', 'JAN', 'US', 'Missisipi', now(), now()),
(3, 'Los Angeles International', 'LAX', 'US', 'Los Angels', now(), now()),
(4, 'Chicago O hare International', 'ORD', 'US', 'Chicago', now(), now()),
(5, 'Hartsfield-jackson Atlanta International', 'ATL', 'US', 'Atlanta', now(), now()),
(6, 'George Bush Intercontinental', 'IAH', 'US', 'Houston', now(), now()),
(7, 'Logan International', 'BOS', 'US', 'BOS', now(), now()),
(8, 'Dallas/Fort Worth International', 'DFW', 'US', 'Dallas', now(), now()),
(9, 'Portland International', 'PDX', 'US', 'Portland', now(), now()),
(10, 'Newark Liberty International', 'EWR', 'US', 'New Jersy', now(), now()),
(11, 'Washington Dulles International', 'IAD', 'US', 'Washington', now(), now()),
(12, 'Sky Harbor International', 'PHX', 'US', 'Pheonix', now(), now()),
(13, 'Orlando International', 'MCO', 'US', 'Florida', now(), now()),
(14, 'San Francisco International', 'SFO', 'US', 'San Francisco', now(), now()),
(15, 'Charlotte Douglas', 'CLT', 'US', 'Charlotte', now(), now()),
(16, 'Seattle-Tacoma International', 'SEA', 'US', 'Seattle', now(), now()),
(17, 'Ronald Reagan Washington National Airport', 'DCA', 'US', 'Virginia', now(), now()),
(18, 'Denver International', 'DEN', 'US', 'Denver', now(), now()),
(19, 'Salt Lake City International', 'SLC', 'US', 'Utah', now(), now());



INSERT INTO 
`flightbookingsystem`.`t_flights` 
(`id`, `code`, `name`, `createdAt`, `updatedAt`) 
VALUES 
(1, 'HA-BAQ', 'Boeing 737 Classic', now(), now()),
(2, 'HA-BMB', 'Boeing 737 NG', now(), now()),
(3, 'HA-BHE', 'AirBusB34', now(), now()),
(4, 'HA-AJG', 'AirBusB32', now(), now()),
(5, 'HA-MXJ', 'Boeing 737 NG', now(), now()),
(6, 'HA-AZF', 'AirbusB38', now(), now()),
(7, 'HA-A009', 'Boeing 737 NG', now(), now()),
(8, 'HA-A103', 'Boeing 717', now(), now()),
(9, 'HA-77530', 'Boeing 737 NG', now(), now());


