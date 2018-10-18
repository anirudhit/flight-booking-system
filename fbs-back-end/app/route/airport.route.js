module.exports = function(app) {
 
    const airports = require('../controller/airport.controller.js');
 
    // Airport list
    app.get('/api/airports/list', airports.airportsList)
    
}