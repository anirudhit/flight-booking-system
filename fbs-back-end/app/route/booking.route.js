module.exports = function(app) {
 
    const bookings = require('../controller/booking.controller.js');
    
    //app.get('/api/booking', user.userDetails);// Get the booking details
    app.post('/api/booking', bookings.bookATicket);// Create a booking
    //app.put('/api/booking', user.updateUserDetails);// Update a booking


    app.get('/api/booking/trips/upcoming', bookings.userUpcomingTrips);// Get user trips
    app.get('/api/booking/trips/cancelled', bookings.userCancelledTrips);// Get cancelled trips
    app.get('/api/booking/trips/history', bookings.userHistoryTrips);// Get history trips
    app.get('/api/booking/trips/cancel', bookings.cancelFlightBooking);// Cancel trip
    app.post('/api/booking/trips/manage', bookings.manageFlightBooking);// Manage trip
    app.get('/api/booking/trips/ticket', bookings.flightTicketDetails);// Ticket details
}