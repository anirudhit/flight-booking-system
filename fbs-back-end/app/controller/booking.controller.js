const db = require('../config/db.config.js');
const uniqid = require('uniqid');
const FlightBooking = db.t_flight_bookings;
const Passenger = db.t_passengers;
const FlightSchedule = db.t_flight_schedules;
const Airport = db.t_airports;
const Flight = db.t_flights;
const bookingQueries = require('../queries/booking');
const Sequelize = require('sequelize');

exports.bookATicket = (req, res) => {
    let registerUserReq = req.body;
    registerUserReq.id = uniqid.time().toLocaleUpperCase();

    let passengerReq = [];

    FlightBooking.create(registerUserReq).then(result => {
        if(result){
            registerUserReq.passengers.forEach(eachPassenger => {
                eachPassenger.flight_booking_id = registerUserReq.id;
                passengerReq.push(eachPassenger);
            });
            for (let i = 0; i < passengerReq.length; i++) { 
                Passenger.create(passengerReq[i]);  
            }
            res.json({
                "message":"Your ticket is booked",
                "flightBooking": result
            });
        }
    });

    // FlightBooking.hasMany(Passenger, {foreignKey: 'flight_booking_id', targetKey: 'id'});
    // Passenger.belongsTo(FlightBooking, {foreignKey: 'flight_booking_id', targetKey: 'id'});

    // FlightBooking.create(registerUserReq, {
    //     include: [{
    //         model: Passenger
    //     }]
    // }).then((result) => {
    //     //console.log(result);
    //     res.send("Done!");
    // });
};


exports.userUpcomingTrips = (req, res) => {
    let userId = req.query.userId;
    let query = bookingQueries.BOOKING_UPCOMING_TRIPS + '\''+userId+ '\'';
    let orderBy = 'ORDER BY `t_flight_bookings`.`date_of_journey`';
    let finalQuery = query + orderBy;
    FlightBooking.sequelize.query(finalQuery,{ type: Sequelize.QueryTypes.SELECT})
    .then(ticketList => {
        res.json(ticketList);
    });
    // FlightBooking.hasOne(FlightSchedule, {
    //     foreignKey: 'flight_schedule_id',
    //     sourceKey: 'id',
    //     constraints: false
    // });
    // FlightBooking.belongsTo(FlightSchedule, {foreignKey: 'flight_schedule_id', sourceKey: 'id'});

    // FlightSchedule.hasOne(Airport, {
    //     foreignKey: 'arrival_id',
    //     sourceKey: 'id',
    //     constraints: false
    // });
    // FlightSchedule.belongsTo(Airport, {as: 'arrival_airport', foreignKey: 'arrival_id', sourceKey: 'id'});
    
    // FlightSchedule.hasOne(Airport, {
    //     foreignKey: 'departure_id',
    //     sourceKey: 'id',
    //     constraints: false
    // });
    // FlightSchedule.belongsTo(Airport, {as: 'departure_airport', foreignKey: 'departure_id', sourceKey: 'id'});
    
    
    // FlightBooking.findAll({
    //     where: {user_id: userId},
    //     attributes: ['id','flight_schedule_id','user_id','date_of_journey',
    //                     'payment_id', 'email', 'cancel_booking', 'createdAt'],
    //     include: [{
    //         model: FlightSchedule,
    //         attributes: ['id', 'departure_id', 'arrival_id'],
    //         include:[{
    //             model: Airport,
    //             as: 'arrival_airport',
    //             attributes: ['id', 'name', 'code', 'country_code', 'city']
    //         },
    //         {
    //             model: Airport,
    //             as: 'departure_airport',
    //             attributes: ['id', 'name', 'code', 'country_code', 'city']
    //         }]
    //     }]
    // }).then(tickets => {
    //     res.json(tickets);
    // });
    
};

exports.userCancelledTrips = (req, res) => {
    let userId = req.query.userId;
    let query = bookingQueries.BOOKING_CANCELLED_TRIPS + '\''+userId+ '\'';
    FlightBooking.sequelize.query(query,{ type: Sequelize.QueryTypes.SELECT})
    .then(ticketList => {
        res.json(ticketList);
    });    
};

exports.userHistoryTrips = (req, res) => {
    let userId = req.query.userId;
    let query = bookingQueries.BOOKING_HISTORY_TRIPS + '\''+userId+ '\'';
    FlightBooking.sequelize.query(query,{ type: Sequelize.QueryTypes.SELECT})
    .then(ticketList => {
        res.json(ticketList);
    });    
};

//Cancel a Flight booking
exports.cancelFlightBooking = (req, res) => {
    let flightBookingId = req.query.bookingId;
    let cancelFlightBooking = {
        cancel_booking : 1
    };
	FlightBooking.update(cancelFlightBooking,{
        where: {id: flightBookingId}
    }).then(() => {
        res.status(200).json({message:"The flight booking is cancelled"});
    });
};

//Manage a Flight booking
exports.manageFlightBooking = (req, res) => {
    let flightBooking = req.body;
	FlightBooking.update(flightBooking.value,{
        where: {id: flightBooking.id}
    }).then(() => {
        res.status(200).json({message:"The flight booking is modified"});
    });
};

//Flight ticket details
exports.flightTicketDetails = (req, res) => {
    let bookingId = req.query.bookingId;
    let query = bookingQueries.BOOKING_DETAILS;
    let finalQuery = query + '\''+ bookingId + '\'';
    FlightBooking.sequelize.query(finalQuery,{ type: Sequelize.QueryTypes.SELECT})
    .then(ticketDetails => {
        if(ticketDetails){
            let responseObj = {
                departure_airport: {},
                arrival_airport: {},
                flight_schedule:{},
                flight_details:{},
                passengers : []
            };
            ticketDetails.forEach(ticket =>{
                console.log(ticket);
                responseObj.id = ticket.id;
                responseObj.cancel_booking = ticket.cancel_booking;
                responseObj.createdAt = ticket.createdAt;
                responseObj.date_of_journey = ticket.date_of_journey;
                responseObj.flight_schedule_id = ticket.flight_schedule_id;
                responseObj.payment_id = ticket.payment_id;
                responseObj.user_id = ticket.user_id;
                responseObj.email = ticket.email;

                responseObj.arrival_airport.city = ticket['t_flight_schedule.arrival_airport.city'];
                responseObj.arrival_airport.code = ticket['t_flight_schedule.arrival_airport.code'];
                responseObj.arrival_airport.country_code = ticket['t_flight_schedule.arrival_airport.country_code'];
                responseObj.arrival_airport.id = ticket['t_flight_schedule.arrival_airport.id'];
                responseObj.arrival_airport.name = ticket['t_flight_schedule.arrival_airport.name'];

                responseObj.departure_airport.city = ticket['t_flight_schedule.departure_airport.city'];
                responseObj.departure_airport.code = ticket['t_flight_schedule.departure_airport.code'];
                responseObj.departure_airport.country_code = ticket['t_flight_schedule.departure_airport.country_code'];
                responseObj.departure_airport.id = ticket['t_flight_schedule.departure_airport.id'];
                responseObj.departure_airport.name = ticket['t_flight_schedule.departure_airport.name'];
                
                responseObj.flight_schedule.arrival_id = ticket['t_flight_schedule.arrival_id'];
                responseObj.flight_schedule.arrival_terminal = ticket['t_flight_schedule.arrival_airport.arrival_terminal'];
                responseObj.flight_schedule.arrival_time = ticket['t_flight_schedule.arrival_time'];
                responseObj.flight_schedule.departure_id = ticket['t_flight_schedule.departure_id'];
                responseObj.flight_schedule.departure_terminal = ticket['t_flight_schedule.arrival_airport.departure_terminal'];
                responseObj.flight_schedule.departure_time = ticket['t_flight_schedule.departure_time'];
                responseObj.flight_schedule.duration = ticket['t_flight_schedule.duration'];
                responseObj.flight_schedule.fare = ticket['t_flight_schedule.fare'];
                responseObj.flight_schedule.flight_id = ticket['t_flight_schedule.flight_id'];
                responseObj.flight_schedule.id = ticket['t_flight_schedule.id'];

                responseObj.flight_details.code = ticket['t_flight_schedule.flight_details.code'],
                responseObj.flight_details.id = ticket['t_flight_schedule.flight_details.id'],
                responseObj.flight_details.name = ticket['t_flight_schedule.flight_details.name'],

                responseObj.passengers.push({
                    date_of_birth : ticket['t_passengers.date_of_birth'],
                    first_name : ticket['t_passengers.first_name'],
                    flight_booking_id : ticket['t_passengers.flight_booking_id'],
                    gender : ticket['t_passengers.gender'],
                    last_name : ticket['t_passengers.last_name'],
                    middle_name : ticket['t_passengers.middle_name'],
                    seat_number : ticket['t_passengers.seat_number'],
                    id : ticket['t_passengers.id'],
                });
            });
            res.json(responseObj);
        }else{
            res.json(ticketDetails);
        }
    });
    // FlightBooking.hasOne(FlightSchedule, {
    //     foreignKey: 'flight_schedule_id',
    //     sourceKey: 'id',
    //     constraints: false
    // });
    // FlightBooking.belongsTo(FlightSchedule, {foreignKey: 'flight_schedule_id', sourceKey: 'id'});

    // FlightBooking.hasMany(Passenger, {
    //     foreignKey: 'flight_booking_id',
    //     sourceKey: 'id',
    //     constraints: false
    // });
    // FlightBooking.belongsTo(Passenger, {foreignKey: 'flight_booking_id', sourceKey: 'id'});

    // FlightSchedule.hasOne(Airport, {
    //     foreignKey: 'arrival_id',
    //     sourceKey: 'id',
    //     constraints: false
    // });
    // FlightSchedule.belongsTo(Airport, {as: 'arrival_airport', foreignKey: 'arrival_id', sourceKey: 'id'});
    
    // FlightSchedule.hasOne(Airport, {
    //     foreignKey: 'departure_id',
    //     sourceKey: 'id',
    //     constraints: false
    // });
    // FlightSchedule.belongsTo(Airport, {as: 'departure_airport', foreignKey: 'departure_id', sourceKey: 'id'});

    // FlightSchedule.hasOne(Flight, {
    //     foreignKey: 'flight_id',
    //     sourceKey: 'id',
    //     constraints: false
    // });
    // FlightSchedule.belongsTo(Flight, {as: 'flight_details', foreignKey: 'flight_id', sourceKey: 'id'});
    
    
    // FlightBooking.findAll({
    //     where: {id: bookingId},
    //     attributes: ['id','flight_schedule_id','user_id','date_of_journey',
    //                     'payment_id', 'email', 'cancel_booking', 'createdAt'],
    //     include: [{
    //         model: FlightSchedule,
    //         attributes: ['id', 'departure_id', 'arrival_id','departure_time','arrival_time','departure_terminal','arrival_terminal',
    //                         'fare','duration','flight_id'],
    //         include:[{
    //             model: Airport,
    //             as: 'arrival_airport',
    //             attributes: ['id', 'name', 'code', 'country_code', 'city']
    //         },{
    //             model: Airport,
    //             as: 'departure_airport',
    //             attributes: ['id', 'name', 'code', 'country_code', 'city']
    //         },{
    //             model: Flight,
    //             as: 'flight_details',
    //             attributes: ['id', 'name', 'code']
    //         }]
    //     },{
    //         model: Passenger,
    //         attributes: ['id', 'flight_booking_id', 'first_name','last_name','middle_name','date_of_birth','gender','seat_number']
    //     }]
    // }).then(tickets => {
    //     res.json(tickets);
    // });
};