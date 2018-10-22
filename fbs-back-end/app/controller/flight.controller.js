const db = require('../config/db.config.js');
const Flight = db.t_flights;
const FlightSchedule = db.t_flight_schedules;

//Send all Flights list
exports.flightsList = (req, res) => {
    Flight.findAll({
        attributes: ['id','code','name']
      }).then(flights => {
        res.json(flights);
    });
};

//Create a Flight schedule
exports.createFlightSchedule = (req, res) => {
    let flightSchedule = req.body;
    FlightSchedule.create(flightSchedule).then(result => {
		res.json(result);
	});
};