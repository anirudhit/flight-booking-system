module.exports = (sequelize, Sequelize) => {
	const UserPwd = sequelize.define('userPwd', {
	  id: {
			type: Sequelize.INTEGER,
			primaryKey: true
	  },
	  user_id: {
			type: Sequelize.STRING
	  },
	  password: {
          type: Sequelize.STRING
      }
	});
	return UserPwd;
}