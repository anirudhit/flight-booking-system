const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.customers = require('../model/customer.model.js')(sequelize, Sequelize);
db.t_users = require('../model/user.model.js')(sequelize, Sequelize);
db.t_user_passwords = require('../model/userPasswords.model.js')(sequelize, Sequelize);
db.t_airports = require('../model/airport.model.js')(sequelize, Sequelize);
db.t_flights = require('../model/flight.model.js')(sequelize, Sequelize);
db.t_flight_schedules = require('../model/flightSchedule.model.js')(sequelize, Sequelize);
db.t_flight_bookings = require('../model/flightBooking.model.js')(sequelize, Sequelize);
db.t_passengers = require('../model/passenger.model.js')(sequelize, Sequelize);

//Relations
//db.t_flight_schedules.belongsTo(db.t_airports);  
//db.t_airports.hasMany(db.t_flight_schedules);  


module.exports = db;