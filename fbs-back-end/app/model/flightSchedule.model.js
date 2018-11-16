module.exports = (sequelize, Sequelize) => {
	const FlightSchedule = sequelize.define('t_flight_schedules', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        arrival_id: {
            type: Sequelize.UUID,
            references: {
                model: 'Airport',
                key: 'id',
            }
        },
        departure_id: {
            type: Sequelize.UUID,
            references: {
                model: 'Airport',
                key: 'id',
            }
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
            type: Sequelize.DECIMAL
        },
        duration: {
            type: Sequelize.STRING
        },
        flight_id: {
            type: Sequelize.UUID
        }
	});
	return FlightSchedule;
}