const db = require('../config/db.config.js');
const Airport = db.t_airports;


//Send all Airports list
exports.airportsList = (req, res) => {
    Airport.findAll({
        attributes: ['id','name','code','city','country_code']
      }).then(airports => {
        res.json(airports);
    });
};