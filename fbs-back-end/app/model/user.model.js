module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {
	  id: {
			type: Sequelize.INTEGER,
			primaryKey: true
	  },
	  username: {
			type: Sequelize.STRING
	  },
	  imageUrl: {
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