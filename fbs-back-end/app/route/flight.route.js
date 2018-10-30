module.exports = function(app) {
 
    const flights = require('../controller/flight.controller.js');
 
    // Airport list
    app.get('/api/flights/list', flights.flightsList);// Get the flight list
    app.post('/api/flights/schedule', flights.createFlightSchedule);// Create the flight schedule
    app.get('/api/flights/schedule/list', flights.getFlightSchedules);// Get the flight schedule list
    app.delete('/api/flights/schedule/:flightId', flights.deleteFlightSchedule);// Delete a flight schedule
    app.put('/api/flights/schedule', flights.updateFlightSchedule);// Update a flight schedule
    app.get('/api/flights/schedule/selected/list', flights.getSelectedFlightSchedules);// Get the selected flight schedule list
}