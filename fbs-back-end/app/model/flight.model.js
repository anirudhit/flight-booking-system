module.exports = (sequelize, Sequelize) => {
	const Flight = sequelize.define('t_flights', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      code: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      }
	});
	return Flight;
}