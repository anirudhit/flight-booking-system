const db = require('../config/db.config.js');
const User = db.t_users;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Get user details by id
exports.userDetails = (req, res) => {
  let id = req.query.id;
  User.findById(id).then(user => {
		res.json(user);
	});
};


//Update user details
exports.updateUserDetails = (req, res) => {
	let user = req.body;
  let id = req.query.id;
  User.update(user,{
    where: {
      id: {
        [Op.eq]: [id]
      }
    }
    }).then(user => {
      if(user){
        res.json(user);
      }
  }).catch(error =>{
    if(error){
      res.json({
        errorMessage: error.parent.sqlMessage
      });
    }
  });
};