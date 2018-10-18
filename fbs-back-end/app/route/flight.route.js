module.exports = function(app) {
 
    const flights = require('../controller/flight.controller.js');
 
    // Airport list
    app.get('/api/flights/list', flights.flightsList);
    app.post('/api/flights/schedule', flights.createFlightSchedule);
    
}