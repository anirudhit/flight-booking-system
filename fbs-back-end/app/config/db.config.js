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
db.t_user_pwds = require('../model/userPwds.model.js')(sequelize, Sequelize);
db.t_airports = require('../model/airport.model.js')(sequelize, Sequelize);
db.t_flights = require('../model/flight.model.js')(sequelize, Sequelize);


module.exports = db;