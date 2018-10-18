const db = require('../config/db.config.js');
const Flight = db.t_flights;


//Send all Airports list
exports.flightsList = (req, res) => {
    Flight.findAll({
        attributes: ['id','code','name']
      }).then(flights => {
        res.json(flights);
    });
};