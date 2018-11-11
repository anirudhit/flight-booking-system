module.exports = Object.freeze({
    //BOOKING_MY_TRIPS: 'SELECT `t_flight_bookings`.`id`, `t_flight_bookings`.`flight_schedule_id`, `t_flight_bookings`.`user_id`, `t_flight_bookings`.`date_of_journey`, `t_flight_bookings`.`payment_id`, `t_flight_bookings`.`email`, `t_flight_bookings`.`cancel_booking`, `t_flight_bookings`.`createdAt`, `t_flight_schedule`.`id` AS `t_flight_schedule.id`, `t_flight_schedule`.`departure_id` AS `t_flight_schedule.departure_id`, `t_flight_schedule`.`arrival_id` AS `t_flight_schedule.arrival_id`, `t_flight_schedule->arrival_airport`.`id` AS `t_flight_schedule.arrival_airport.id`, `t_flight_schedule->arrival_airport`.`name` AS `t_flight_schedule.arrival_airport.name`, `t_flight_schedule->arrival_airport`.`code` AS `t_flight_schedule.arrival_airport.code`, `t_flight_schedule->arrival_airport`.`country_code` AS `t_flight_schedule.arrival_airport.country_code`, `t_flight_schedule->arrival_airport`.`city` AS `t_flight_schedule.arrival_airport.city`, `t_flight_schedule->departure_airport`.`id` AS `t_flight_schedule.departure_airport.id`, `t_flight_schedule->departure_airport`.`name` AS `t_flight_schedule.departure_airport.name`, `t_flight_schedule->departure_airport`.`code` AS `t_flight_schedule.departure_airport.code`, `t_flight_schedule->departure_airport`.`country_code` AS `t_flight_schedule.departure_airport.country_code`, `t_flight_schedule->departure_airport`.`city` AS `t_flight_schedule.departure_airport.city` FROM `t_flight_bookings` AS `t_flight_bookings` LEFT OUTER JOIN `t_flight_schedules` AS `t_flight_schedule` ON `t_flight_bookings`.`flight_schedule_id` = `t_flight_schedule`.`id` LEFT OUTER JOIN `t_airports` AS `t_flight_schedule->arrival_airport` ON `t_flight_schedule`.`arrival_id` = `t_flight_schedule->arrival_airport`.`id` LEFT OUTER JOIN `t_airports` AS `t_flight_schedule->departure_airport` ON `t_flight_schedule`.`departure_id` = `t_flight_schedule->departure_airport`.`id` WHERE `t_flight_bookings`.`user_id` = ',
    //BOOKING_MY_TRIPS: 'SELECT `t_flight_bookings`.`id`, `t_flight_bookings`.`flight_schedule_id`, `t_flight_bookings`.`user_id`, `t_flight_bookings`.`date_of_journey`, `t_flight_bookings`.`payment_id`, `t_flight_bookings`.`email`, `t_flight_bookings`.`cancel_booking`, `t_flight_bookings`.`createdAt`, `t_flight_schedule`.`id` AS `scheduleId`, `t_flight_schedule`.`departure_id` AS `departureId`, `t_flight_schedule`.`arrival_id` AS `arrivalId`, `t_flight_schedule->arrival_airport`.`id` AS `arrivalAirportId`, `t_flight_schedule->arrival_airport`.`name` AS `arrivalAirportName`, `t_flight_schedule->arrival_airport`.`code` AS `arrivalAirportCode`, `t_flight_schedule->arrival_airport`.`country_code` AS `arrivalAirportCountryCode`, `t_flight_schedule->arrival_airport`.`city` AS `arrivalAirportCity`, `t_flight_schedule->departure_airport`.`id` AS `departureAirportId`, `t_flight_schedule->departure_airport`.`name` AS `departureAirportName`, `t_flight_schedule->departure_airport`.`code` AS `departureAirportCode`, `t_flight_schedule->departure_airport`.`country_code` AS `departureAirportCountryCode`, `t_flight_schedule->departure_airport`.`city` AS `departureAirportCity` FROM `t_flight_bookings` AS `t_flight_bookings` LEFT OUTER JOIN `t_flight_schedules` AS `t_flight_schedule` ON `t_flight_bookings`.`flight_schedule_id` = `t_flight_schedule`.`id` LEFT OUTER JOIN `t_airports` AS `t_flight_schedule->arrival_airport` ON `t_flight_schedule`.`arrival_id` = `t_flight_schedule->arrival_airport`.`id` LEFT OUTER JOIN `t_airports` AS `t_flight_schedule->departure_airport` ON `t_flight_schedule`.`departure_id` = `t_flight_schedule->departure_airport`.`id` WHERE `t_flight_bookings`.`date_of_journey` >= now() AND `t_flight_bookings`.`user_id` = '
    BOOKING_UPCOMING_TRIPS: 'SELECT `t_flight_bookings`.`id`, `t_flight_bookings`.`flight_schedule_id`, `t_flight_bookings`.`user_id`, `t_flight_bookings`.`date_of_journey`, `t_flight_bookings`.`payment_id`, `t_flight_bookings`.`email`, `t_flight_bookings`.`cancel_booking`, `t_flight_bookings`.`createdAt`, `t_flight_bookings`.`updatedAt`, `t_flight_schedule`.`id` AS `scheduleId`, `t_flight_schedule`.`departure_id` AS `departureId`, `t_flight_schedule`.`arrival_id` AS `arrivalId`, `t_flight_schedule->arrival_airport`.`id` AS `arrivalAirportId`, `t_flight_schedule->arrival_airport`.`name` AS `arrivalAirportName`, `t_flight_schedule->arrival_airport`.`code` AS `arrivalAirportCode`, `t_flight_schedule->arrival_airport`.`country_code` AS `arrivalAirportCountryCode`, `t_flight_schedule->arrival_airport`.`city` AS `arrivalAirportCity`, `t_flight_schedule->departure_airport`.`id` AS `departureAirportId`, `t_flight_schedule->departure_airport`.`name` AS `departureAirportName`, `t_flight_schedule->departure_airport`.`code` AS `departureAirportCode`, `t_flight_schedule->departure_airport`.`country_code` AS `departureAirportCountryCode`, `t_flight_schedule->departure_airport`.`city` AS `departureAirportCity` FROM `t_flight_bookings` AS `t_flight_bookings` LEFT OUTER JOIN `t_flight_schedules` AS `t_flight_schedule` ON `t_flight_bookings`.`flight_schedule_id` = `t_flight_schedule`.`id` LEFT OUTER JOIN `t_airports` AS `t_flight_schedule->arrival_airport` ON `t_flight_schedule`.`arrival_id` = `t_flight_schedule->arrival_airport`.`id` LEFT OUTER JOIN `t_airports` AS `t_flight_schedule->departure_airport` ON `t_flight_schedule`.`departure_id` = `t_flight_schedule->departure_airport`.`id` WHERE `t_flight_bookings`.`date_of_journey` >= curdate() AND `t_flight_bookings`.`cancel_booking` = 0 AND `t_flight_bookings`.`user_id` = ',
    BOOKING_CANCELLED_TRIPS: 'SELECT `t_flight_bookings`.`id`, `t_flight_bookings`.`flight_schedule_id`, `t_flight_bookings`.`user_id`, `t_flight_bookings`.`date_of_journey`, `t_flight_bookings`.`payment_id`, `t_flight_bookings`.`email`, `t_flight_bookings`.`cancel_booking`, `t_flight_bookings`.`createdAt`, `t_flight_bookings`.`updatedAt`, `t_flight_schedule`.`id` AS `scheduleId`, `t_flight_schedule`.`departure_id` AS `departureId`, `t_flight_schedule`.`arrival_id` AS `arrivalId`, `t_flight_schedule->arrival_airport`.`id` AS `arrivalAirportId`, `t_flight_schedule->arrival_airport`.`name` AS `arrivalAirportName`, `t_flight_schedule->arrival_airport`.`code` AS `arrivalAirportCode`, `t_flight_schedule->arrival_airport`.`country_code` AS `arrivalAirportCountryCode`, `t_flight_schedule->arrival_airport`.`city` AS `arrivalAirportCity`, `t_flight_schedule->departure_airport`.`id` AS `departureAirportId`, `t_flight_schedule->departure_airport`.`name` AS `departureAirportName`, `t_flight_schedule->departure_airport`.`code` AS `departureAirportCode`, `t_flight_schedule->departure_airport`.`country_code` AS `departureAirportCountryCode`, `t_flight_schedule->departure_airport`.`city` AS `departureAirportCity` FROM `t_flight_bookings` AS `t_flight_bookings` LEFT OUTER JOIN `t_flight_schedules` AS `t_flight_schedule` ON `t_flight_bookings`.`flight_schedule_id` = `t_flight_schedule`.`id` LEFT OUTER JOIN `t_airports` AS `t_flight_schedule->arrival_airport` ON `t_flight_schedule`.`arrival_id` = `t_flight_schedule->arrival_airport`.`id` LEFT OUTER JOIN `t_airports` AS `t_flight_schedule->departure_airport` ON `t_flight_schedule`.`departure_id` = `t_flight_schedule->departure_airport`.`id` WHERE `t_flight_bookings`.`cancel_booking` = 1 AND `t_flight_bookings`.`user_id` = ',
    BOOKING_HISTORY_TRIPS: 'SELECT `t_flight_bookings`.`id`, `t_flight_bookings`.`flight_schedule_id`, `t_flight_bookings`.`user_id`, `t_flight_bookings`.`date_of_journey`, `t_flight_bookings`.`payment_id`, `t_flight_bookings`.`email`, `t_flight_bookings`.`cancel_booking`, `t_flight_bookings`.`createdAt`, `t_flight_bookings`.`updatedAt`, `t_flight_schedule`.`id` AS `scheduleId`, `t_flight_schedule`.`departure_id` AS `departureId`, `t_flight_schedule`.`arrival_id` AS `arrivalId`, `t_flight_schedule->arrival_airport`.`id` AS `arrivalAirportId`, `t_flight_schedule->arrival_airport`.`name` AS `arrivalAirportName`, `t_flight_schedule->arrival_airport`.`code` AS `arrivalAirportCode`, `t_flight_schedule->arrival_airport`.`country_code` AS `arrivalAirportCountryCode`, `t_flight_schedule->arrival_airport`.`city` AS `arrivalAirportCity`, `t_flight_schedule->departure_airport`.`id` AS `departureAirportId`, `t_flight_schedule->departure_airport`.`name` AS `departureAirportName`, `t_flight_schedule->departure_airport`.`code` AS `departureAirportCode`, `t_flight_schedule->departure_airport`.`country_code` AS `departureAirportCountryCode`, `t_flight_schedule->departure_airport`.`city` AS `departureAirportCity` FROM `t_flight_bookings` AS `t_flight_bookings` LEFT OUTER JOIN `t_flight_schedules` AS `t_flight_schedule` ON `t_flight_bookings`.`flight_schedule_id` = `t_flight_schedule`.`id` LEFT OUTER JOIN `t_airports` AS `t_flight_schedule->arrival_airport` ON `t_flight_schedule`.`arrival_id` = `t_flight_schedule->arrival_airport`.`id` LEFT OUTER JOIN `t_airports` AS `t_flight_schedule->departure_airport` ON `t_flight_schedule`.`departure_id` = `t_flight_schedule->departure_airport`.`id` WHERE `t_flight_bookings`.`date_of_journey` < curdate() AND `t_flight_bookings`.`cancel_booking` = 0 AND `t_flight_bookings`.`user_id` = ',

});