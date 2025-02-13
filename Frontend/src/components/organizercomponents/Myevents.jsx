import React, { useState, useEffect } from 'react';
import { Grid2, Paper, Typography, Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axiosInstance from '../interceptor/axiosInterceptor';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';

const Myevents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axiosInstance.get('/org/myevents/').then((res) => {
      setEvents(res.data);  
    }).catch((error) => {
      alert('Failed to fetch events');
    });

    axiosInstance.get('/org/booking/').then((res) => {
      setBookings(res.data);  
    }).catch((error) => {
      alert('Failed to fetch bookings');
    });
  }, []);

  const handleEventClick = (eventId) => {
    const event = events.find((event) => event._id === eventId);
    setSelectedEvent(event);
  };

  const handleBack = () => {
    setSelectedEvent(null);
  };

  const renderEventDetails = () => {
    if (!selectedEvent) return null;

    const { title, totalTickets, date, location, poster } = selectedEvent;
    const eventBookings = bookings.filter(booking => booking.event_id === selectedEvent._id);
    const ticketsSold = eventBookings.reduce((acc, booking) => acc + parseInt(booking.tickets, 10), 0);
    const ticketsRemaining = totalTickets - ticketsSold;

    return (
      <Paper sx={{ padding: 2, marginTop: 2, borderRadius: '10px', boxShadow: 3 }}>
        <Box sx={{
          backgroundImage: `url(${poster})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: 3,
          borderRadius: '10px',
          textAlign: 'center',
          color: '#fff',
          height: '250px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Typography variant="h4" sx={{
            fontWeight: 'bold',
            color: '#fff',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
            textAlign: 'center',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
          }}>
            {title}
          </Typography>
        </Box>

        <Box sx={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: 3,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2
        }}>
          <Button variant="outlined" color="primary" sx={{ flex: 1 }}>Total Tickets: {totalTickets}</Button>
          <Button variant="outlined" color="secondary" sx={{ flex: 1 }}>Tickets Sold: {ticketsSold}</Button>
          <Button variant="outlined" color="error" sx={{ flex: 1 }}>Tickets Remaining: {ticketsRemaining}</Button>
        </Box>

        <Typography variant="h5" color="primary" sx={{ marginTop: 3 }}>Bookings</Typography>
        <Table sx={{ minWidth: 300 }}>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Tickets Booked</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventBookings.map((booking, index) => (
              <TableRow key={index}>
                <TableCell>{booking.userId}</TableCell>
                <TableCell>{booking.userName || 'N/A'}</TableCell>
                <TableCell>{booking.tickets}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleBack}>
            Back to Events
          </Button>
        </Box>
      </Paper>
    );
  };

  return (
    <Grid2 container spacing={3} justifyContent="center" sx={{ padding: 3 }}>
      {selectedEvent ? (
        <Grid2 item xs={12} sm={8} md={6}>
          {renderEventDetails()}
        </Grid2>
      ) : (
        events.map((event) => (
          <Grid2 item xs={12} sm={6} md={3} key={event._id}>
            <Paper sx={{
              padding: 3,
              backgroundColor: '#f7f7f7',
              cursor: 'pointer',
              borderRadius: '10px',
              boxShadow: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '300px', 
              height: '100%',
              width: '100%'  
            }}>
              <Typography variant="h6" sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 1
              }}>
                {event.title}
              </Typography>
              <Box sx={{
                backgroundImage: `url(${event.poster})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '150px',
                borderRadius: '10px',
                marginBottom: 2
              }} />
              <Box sx={{ padding: 1, textAlign: 'center' }}>
                <Typography variant="body2" color="textSecondary">
                 <FaCalendarAlt/> {new Date(event.date).toDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                 <FaClock/> {event.time}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <FaMapMarkerAlt/>{event.location}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Category: {event.category}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEventClick(event._id)}
                sx={{
                  marginTop: 'auto',
                  display: 'block',
                  margin: '0 auto',
                  width: '100%',
                  textAlign: 'center'
                }}
              >
                View Booking Details
              </Button>
            </Paper>
          </Grid2>
        ))
      )}
    </Grid2>
  );
};

export default Myevents;
