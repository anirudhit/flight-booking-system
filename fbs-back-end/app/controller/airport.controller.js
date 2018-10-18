const db = require('../config/db.config.js');
const Airport = db.t_airports;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Send all Airports list
exports.airportsList = (req, res) => {
    Airport.findAll({
        attributes: ['id','name','code','city','country_code']
      }).then(airports => {
        res.json(airports);
    });
};

//Send arrival Airports list
exports.airportsArrivalList = (req, res) => {
    Airport.findAll({
        attributes: ['id','name','code','city','country_code']
      }).then(airports => {
        res.json(airports);
    });
};

//Send departure Airports list
exports.airportsDepartureList = (req, res) => {
    Airport.findAll({
        attributes: ['id','name','code','city','country_code'],
        where: {
            id: {
              [Op.ne]: [1]
            }
        }
      }).then(airports => {
        res.json(airports);
    });
};