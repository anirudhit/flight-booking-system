module.exports = (sequelize, Sequelize) => {
	const UserPwd = sequelize.define('userPwd', {
	  userid: {
			type: Sequelize.STRING
	  },
	  password: {
          type: Sequelize.STRING
      }
	});
	return UserPwd;
}