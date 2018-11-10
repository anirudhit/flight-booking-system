const db = require('../config/db.config.js');
const uniqid = require('uniqid');
const FlightBooking = db.t_flight_bookings;
const Passenger = db.t_passengers;
const FlightSchedule = db.t_flight_schedules;
const Airport = db.t_airports;
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
            res.json({"message":"Your ticket is booked"});
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
    let query = bookingQueries.BOOKING_MY_TRIPS + '\''+userId+ '\'';
    console.log(userId);
    FlightBooking.sequelize.query(query,{ type: Sequelize.QueryTypes.SELECT})
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