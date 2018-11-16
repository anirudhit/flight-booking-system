module.exports = function(app) {
 
    const registeredUser = require('../controller/register.controller.js');
 
    // Authenticate user login
    app.post('/api/checkregistration', registeredUser.findRegisteredUser);
    app.post('/api/register', registeredUser.registerUser);
}