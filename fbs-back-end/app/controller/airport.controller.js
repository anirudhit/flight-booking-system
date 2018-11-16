const db = require('../config/db.config.js');
const Airport = db.t_airports;
const FlightSchedule = db.t_flight_schedules;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const flightQueries = require('../queries/flights');

//Send all Airports list
exports.airportsList = (req, res) => {
    Airport.findAll({
        attributes: ['id','name','code','city','country_code']
      }).then(airports => {
        res.json(airports);
    });
};

//Send arrival Airports list
exports.airportsDepartureList = (req, res) => {
    Airport.findAll({
        attributes: ['id','name','code','city','country_code']
      }).then(airports => {
        res.json(airports);
    });
};

//Send departure Airports list
exports.airportsArrivalList = (req, res) => {
    Airport.findAll({
        attributes: ['id','name','code','city','country_code'],
        where: {
            id: {
              [Op.ne]: [req.query.id]
            }
        }
      }).then(airports => {
        res.json(airports);
    });
};

//Send  scheduled departure Airports list
exports.airportsScheduledDepartureList = (req, res) => {
    FlightSchedule.sequelize.query(flightQueries.FLIGHT_DEPARTURE_SCHEDULE_LIST,{ type: Sequelize.QueryTypes.SELECT})
    .then(departureScheduleList => {
            res.json(departureScheduleList);
    });
};

//Send  scheduled arrival Airports list
exports.airportsScheduledArrivalList = (req, res) => {
    let departureId = req.query.id;
    let query = flightQueries.FLIGHT_ARRIVAL_SCHEDULE_LIST + '='+departureId+');';
    FlightSchedule.sequelize.query(query,{ type: Sequelize.QueryTypes.SELECT})
    .then(departureArrivalList => {
            res.json(departureArrivalList);
    });
};