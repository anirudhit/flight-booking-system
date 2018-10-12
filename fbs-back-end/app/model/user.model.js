module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('t_users', {
	  id: {
			type: Sequelize.INTEGER,
			primaryKey: true
	  },
	  username: {
			type: Sequelize.STRING
	  },
	  image_url: {
		  type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    }
	});
	return User;
}