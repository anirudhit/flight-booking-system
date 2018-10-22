module.exports = (sequelize, Sequelize) => {
	const FlightSchedule = sequelize.define('t_flight_schedules', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        arrival_id: {
            type: Sequelize.INTEGER
        },
        departure_id: {
            type: Sequelize.INTEGER
        },
        arrival_time: {
            type: Sequelize.STRING
        },
        departure_time: {
            type: Sequelize.STRING
        },
        arrival_terminal: {
            type: Sequelize.STRING
        },
        departure_terminal: {
            type: Sequelize.STRING
        },
        fare: {
            type: Sequelize.STRING
        },
        duration: {
            type: Sequelize.STRING
        },
        flight_id: {
            type: Sequelize.INTEGER
        }
	});
	return FlightSchedule;
}