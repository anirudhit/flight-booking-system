module.exports = function(app) {
 
    const airports = require('../controller/airport.controller.js');
 
    // Airport list
    app.get('/api/airports/list', airports.airportsList);// Get all airport list
    app.get('/api/airports/departure/list', airports.airportsDepartureList); // Get departure airport list
    app.get('/api/airports/arrival/list', airports.airportsArrivalList);// Get arrival airport list (Selected departure airport will be removed)
    app.get('/api/airports/departure/schedule/list', airports.airportsScheduledDepartureList);// Get scheduled departure airport list
    app.get('/api/airports/arrival/schedule/list', airports.airportsScheduledArrivalList);// Get scheduled arrival airport list (Selected scheduled departure airport will be removed)
    
}