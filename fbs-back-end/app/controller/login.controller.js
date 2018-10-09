const db = require('../config/db.config.js');
const LoginUser = db.users;
const LoginUserPwd = db.userpwds;
// Authenticate the logged in user
exports.findLoggedInUser = (req, res) => {
	let loginUser = req.body;
	LoginUser.findOne({ attributes: [
		'id',
		'username',
		'imageUrl',
		'name',
		'email'
	 ],where: {name: loginUser.name} }).then(user => {
		// Send logged in user
		if(user){
			LoginUserPwd.findOne({ attributes: [
				'id',
				'user_id',
				'password'
		 	],where: {user_id: user.id} }).then(userPassword => {
				// check logged in user password
				if(userPassword.password === loginUser.password){
					res.json(user);
				}else{
					res.json(null);
				}
			});
		}else{
			res.json(user);
		}
	});
};