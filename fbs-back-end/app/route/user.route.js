module.exports = function(app) {
 
    const user = require('../controller/user.controller.js');
 
    // User details
    app.get('/api/user', user.userDetails);

    //Update user details with id
    app.put('/api/user', user.updateUserDetails);
}