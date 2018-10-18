module.exports = function(app) {
 
    const airports = require('../controller/airport.controller.js');
 
    // Airport list
    app.get('/api/airports/list', airports.airportsList);
    app.get('/api/airports/arrival/list', airports.airportsArrivalList);
    app.get('/api/airports/departure/list', airports.airportsDepartureList);
    
}