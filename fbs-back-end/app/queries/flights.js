// module.exports = () => {
//     const queries ={
//         flightScheduledList: "anirudh"
//     };
// 	return queries;
// }

module.exports = Object.freeze({
    FLIGHT_SCHEDULE_LIST: 'SELECT `t_flight_schedules`.`id`, `t_flight_schedules`.`arrival_time`, `t_flight_schedules`.`departure_time`, `t_flight_schedules`.`arrival_terminal`, `t_flight_schedules`.`departure_terminal`, `t_flight_schedules`.`fare`, `t_flight_schedules`.`duration`, `t_flight_schedules`.`createdAt`, `t_flight_schedules`.`updatedAt`, `arrivalAirport`.`id` AS `arrivalAirportId`, `arrivalAirport`.`name` AS `arrivalAirportName`, `arrivalAirport`.`code` AS `arrivalAirportCode`, `arrivalAirport`.`country_code` AS `arrivalAirportCountryCode`, `arrivalAirport`.`city` AS `arrivalAirportCity`, `departureAirport`.`id` AS `departureAirportId`, `departureAirport`.`name` AS `departureAirportName`, `departureAirport`.`code` AS `departureAirportCode`, `departureAirport`.`country_code` AS `departureAirportCountryCode`, `departureAirport`.`city` AS `departureAirportCity`, `t_flight`.`id` AS `flightId`, `t_flight`.`name` AS `flightName`, `t_flight`.`code` AS `flightCode` FROM `t_flight_schedules` AS `t_flight_schedules` LEFT OUTER JOIN `t_airports` AS `arrivalAirport` ON `t_flight_schedules`.`arrival_id` = `arrivalAirport`.`id` LEFT OUTER JOIN `t_airports` AS `departureAirport` ON `t_flight_schedules`.`departure_id` = `departureAirport`.`id` LEFT OUTER JOIN `t_flights` AS `t_flight` ON `t_flight_schedules`.`flight_id` = `t_flight`.`id`;',
});