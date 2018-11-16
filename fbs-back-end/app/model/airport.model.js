module.exports = (sequelize, Sequelize) => {
	const Airport = sequelize.define('t_airports', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      country_code: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      }
	});
	return Airport;
}