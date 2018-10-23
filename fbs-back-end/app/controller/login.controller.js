const db = require('../config/db.config.js');
const LoginUser = db.t_users;
const LoginUserPassword = db.t_user_passwords;
// Authenticate the logged in user
exports.findLoggedInUser = (req, res) => {
	let loginUser = req.body;
	LoginUser.findOne({ attributes: [
		'id',
		'username',
		'image_url',
		'name',
		'email'
	 ],where: {username: loginUser.username} }).then(user => {
		// Send logged in user
		if(user){
			LoginUserPassword.findOne({ attributes: [
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