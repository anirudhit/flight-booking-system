module.exports = (sequelize, Sequelize) => {
	const UserPwd = sequelize.define('t_user_pwds', {
	  user_id: {
			type: Sequelize.STRING
	  },
	  password: {
          type: Sequelize.STRING
      }
	});
	return UserPwd;
}