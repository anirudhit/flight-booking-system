module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('t_users', {
	  id: {
			type: Sequelize.INTEGER,
			primaryKey: true
	  },
	  username: {
			type: Sequelize.STRING
		},
		name: {
			type: Sequelize.STRING
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
		ssn: {
			type: Sequelize.STRING
		},
		cell_number: {
			type: Sequelize.STRING
	  },
	  image_url: {
		  type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
		},
		address: {
		  type: Sequelize.STRING
    }
	});
	return User;
}