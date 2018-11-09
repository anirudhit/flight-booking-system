module.exports = (sequelize, Sequelize) => {
	const FlightBooking = sequelize.define('t_flight_bookings', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        flight_schedule_id: {
            type: Sequelize.UUID,
            references: {
                model: 'FlightSchedule',
                key: 'id',
            }
        },
        user_id: {
            type: Sequelize.STRING
        },
        date_of_journey: {
            type: Sequelize.DATE
        },
        payment_id: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        cell_number: {
            type: Sequelize.STRING
        },
        cancel_booking: {
            type: Sequelize.STRING
        }
	});
	return FlightBooking;
}