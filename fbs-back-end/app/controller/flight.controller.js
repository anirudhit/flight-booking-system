const db = require('../config/db.config.js');
const Flight = db.t_flights;
const FlightSchedule = db.t_flight_schedules;
const Airport = db.t_airports;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const flightQueries = require('../queries/flights');

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

//Delete a Flight schedule
exports.deleteFlightSchedule = (req, res) => {
    let id = req.params.flightId;
    FlightSchedule.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).json({message:'The flight schedule is deleted.'});
    });
};

//Get flight schedule list
exports.getFlightSchedules = (req, res) => {
    FlightSchedule.sequelize.query(flightQueries.FLIGHT_SCHEDULE_LIST,{ type: Sequelize.QueryTypes.SELECT})
    .then(scheduleList => {
            res.json(scheduleList);
    });
    let flightSchedule = req.query;
    /*FlightSchedule.hasOne(Airport, {
        foreignKey: 'arrival_id',
        sourceKey: 'id',
        constraints: false
    });
    FlightSchedule.belongsTo(Airport, {as: 'arrival_airport', foreignKey: 'arrival_id', sourceKey: 'id'});

    FlightSchedule.hasOne(Airport, {
        foreignKey: 'departure_id',
        sourceKey: 'id',
        constraints: false
    });
    FlightSchedule.belongsTo(Airport, {as: 'departure_airport', foreignKey: 'departure_id', sourceKey: 'id'});

    FlightSchedule.hasOne(Flight, {
        foreignKey: 'flight_id',
        sourceKey: 'id',
        constraints: false
    });
    FlightSchedule.belongsTo(Flight, {as: 'flight', foreignKey: 'flight_id', sourceKey: 'id'});

    FlightSchedule.findAll({
        attributes: ['id','arrival_time','departure_time','arrival_terminal',
                        'departure_terminal', 'fare', 'duration', 'createdAt', 'updatedAt'],
        include: [
        {
            model: Airport,
            as: 'arrival_airport',
            attributes: ['id', 'name', 'code', 'country_code', 'city']
        },
        {
            model: Airport,
            as: 'departure_airport',
            attributes: ['id', 'name', 'code', 'country_code', 'city']
        },
        {
            model: Flight,
            as: 'flight',
            attributes: ['id', 'name', 'code']
        }
    ]
    }).then(schedules => {
        // const resObj = schedules.map(schedule => {
        //     //console.log(schedule);
        //     return Object.assign(
        //         {},
        //         {
        //           id: schedule.id,
        //           arrival_time: schedule.arrival_time,
        //           departure_time: schedule.departure_time,
        //           arrival_terminal: schedule.arrival_terminal,
        //           departure_terminal: schedule.departure_terminal,
        //           arrival_airport: schedule.t_airport,
        //           flight_info: schedule.t_flight,
        //           fare: schedule.fare,
        //           duration: schedule.duration,
        //           createdAt: schedule.createdAt,
        //           updatedAt: schedule.updatedAt
        //         }
        //       )
        // });
        // res.json(resObj);
        //res.json(schedules);
    });*/
};