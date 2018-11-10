module.exports = function(app) {
 
    const bookings = require('../controller/booking.controller.js');
    
    //app.get('/api/booking', user.userDetails);// Get the booking details
    app.post('/api/booking', bookings.bookATicket);// Create a booking
    //app.put('/api/booking', user.updateUserDetails);// Update a booking


    app.get('/api/booking/trips/upcoming', bookings.userUpcomingTrips);// Get user trips
}