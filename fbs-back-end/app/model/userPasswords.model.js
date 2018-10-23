module.exports = (sequelize, Sequelize) => {
	const UserPasswords = sequelize.define('t_user_passwords', {
	  user_id: {
			type: Sequelize.STRING
	  },
	  password: {
          type: Sequelize.STRING
      }
	});
	return UserPasswords;
}