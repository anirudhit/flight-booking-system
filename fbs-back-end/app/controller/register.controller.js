const db = require('../config/db.config.js');
const LoginUser = db.t_users;
const LoginUserPwd = db.t_user_pwds;

exports.registerUser = (req, res) => {
    let registerUserReq = req.body;
    // Save to MySQL database
    let registerUser = {
        username: registerUserReq.username,
        image_url: registerUserReq.imageUrl,
        name: registerUserReq.name,
        email: registerUserReq.email
    };
	LoginUser.create(registerUser).then(result => {
        if(result){
            LoginUser.findOne({ attributes: [
                'id'
             ],where: {username: registerUserReq.username} }).then(user => {
                // Send logged in user
                if(user){
                    let registerUserPassword = {
                        user_id: user.id,
                        password: registerUserReq.password
                    };
                    LoginUserPwd.create(registerUserPassword).then(result => {		
                        // Send the cerated acknowledgement to client
                        if(result){
                            res.json(true);
                        }else{
                            res.json(false);
                        }
                    });
                }else{
                    res.json(false);
                }
            });
        }else{
            res.json(false);
        }
	});
};

// Authenticate the registered user
exports.findRegisteredUser = (req, res) => {
    let registeredUser = req.body;
	LoginUser.findOne({ attributes: [
		'id',
		'username',
		'name',
		'email'
	 ],where: { username: registeredUser.userName } }).then(user => {
        // Send registered user
        if(user){
            res.json(true);
        }else{
            res.json(false);
        }
	});
};