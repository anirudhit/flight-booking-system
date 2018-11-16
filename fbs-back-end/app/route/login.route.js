module.exports = function(app) {
 
    const users = require('../controller/login.controller.js');
 
    // Authenticate user login
    app.post('/api/login', users.findLoggedInUser);
}