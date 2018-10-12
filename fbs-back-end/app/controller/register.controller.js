const db = require('../config/db.config.js');
const LoginUser = db.users;
const LoginUserPwd = db.userpwds;

exports.registerUser = (req, res) => {
    let registerUserReq = req.body;
    // Save to MySQL database
    let registerUser = {
        username: registerUserReq.username,
        imageUrl: registerUserReq.imageUrl,
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
                        userid: user.id,
                        password: registerUserReq.password
                    };
                    LoginUserPwd.create(registerUserPassword).then(result => {		
                        // Send the cerated acknowledgement to client
                        if(result){
                            console.log("in if");
                            res.json(true);
                        }else{
                            console.log("in else");
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