module.exports = function(app) {
 
    const flights = require('../controller/flight.controller.js');
 
    // Airport list
    app.get('/api/flights/list', flights.flightsList);
    app.post('/api/flights/schedule', flights.createFlightSchedule);
    app.get('/api/flights/schedule/list', flights.getFlightSchedules);
    app.delete('/api/flights/schedule/:flightId', flights.deleteFlightSchedule);
    
    
}