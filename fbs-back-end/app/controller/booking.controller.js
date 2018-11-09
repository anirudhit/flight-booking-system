const db = require('../config/db.config.js');
const uniqid = require('uniqid');
const FlightBooking = db.t_flight_bookings;
const Passenger = db.t_passengers;

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