module.exports = (sequelize, Sequelize) => {
	const Passenger = sequelize.define('t_passengers', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        flight_booking_id: {
            type: Sequelize.UUID,
            references: {
                model: 'FlightBooking',
                key: 'id',
            }
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        middle_name: {
            type: Sequelize.STRING
        },
        date_of_birth: {
            type: Sequelize.DATE
        },
        gender: {
            type: Sequelize.STRING
        },
        seat_number: {
            type: Sequelize.STRING
        }
	});
	return Passenger;
}