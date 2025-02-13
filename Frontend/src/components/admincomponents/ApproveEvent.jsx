import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Button, Box, Container, Chip } from '@mui/material';
import axiosInstance from '../interceptor/axiosInterceptor';
import styles from './ApproveEvent.module.css'; 

const ApproveEvent = () => {
  const [events, setEvents] = useState([]);
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    axiosInstance.get('/events/')
      .then((res) => {
        const { EventA, EventUn } = res.data;
        setEvents(EventUn);
        setApprovedEvents(EventA);
        setPendingCount(EventUn.length);
        setApprovedCount(EventA.length);
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to fetch events');
      });
  };

  const handleApprove = (eventId) => {
    axiosInstance.get(`/approve-event/${eventId}`)
      .then((res) => {
        alert(`Event with ID: ${eventId} has been approved`);
        loadEvents();
      })
      .catch((error) => {
        alert('Failed to approve event');
      });
  };

  const handleDelete = (eventId) => {
    axiosInstance.delete(`/delete/${eventId}`)
      .then((res) => {
        alert(`Event with ID: ${eventId} has been deleted`);
        loadEvents();
      })
      .catch((error) => {
        alert('Failed to delete event');
      });
  };

  const handleBlock = (eventId) => {
    axiosInstance.get(`/block-event/${eventId}`)
      .then((res) => {
        alert(`Event with ID: ${eventId} has been blocked`);
        loadEvents();
      })
      .catch((error) => {
        alert('Failed to block event');
      });
  };

  return (
    <Container className={styles.dashboardContainer}>
      <div className={styles.backgroundImage}></div>

      <Box className="text-center my-4">
        <Typography variant="h4" className="mb-2" style={{ color: '#333' }}>
          Event Approval Dashboard
        </Typography>
        <Box display="flex" justifyContent="center" gap={4}>
          <Chip label={` Pending Events: ${pendingCount}`} color="error" />
             <Chip label={`Approved Events:${approvedCount}`} color="success" />
        </Box>
      </Box>

      <hr className={styles.horizontalRule} style={{ color: 'black' }} />

      <Typography variant="h4" className={styles.sectionTitle} style={{  color: 'purple' }}>
        Pending Events
      </Typography>
      <Grid container spacing={3} className={styles.eventGrid}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event._id}>
            <Paper className={styles.eventCard}>
              <Box
                className={styles.eventHeader}
                style={{ backgroundImage: `url(${event.poster})` }}
              >
                <Typography variant="h6" className={styles.eventTitle}>
                  {event.title}
                </Typography>
              </Box>

              <Typography variant="body1" className={styles.eventDetails} paragraph>
                {event.details}
              </Typography>

              <Typography variant="body2" className={styles.eventDetails}>
                <strong>Total Tickets:</strong> {event.totalTickets}
              </Typography>
              <Typography variant="body2" className={styles.eventDetails}>
                <strong>Ticket Price:</strong> ₹{event.ticketPrice}
              </Typography>

              <Box className={styles.eventButtons}>
                <Button
                  variant="contained"
                  color="success" 
                  onClick={() => handleApprove(event._id)}
                  disabled={event.approved}
                >
                  Approve
                </Button>
                <Button
                  variant="outlined"
                  color="error" 
                  onClick={() => handleDelete(event._id)}
                >
                  Delete
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" className={styles.sectionTitle} style={{ color: 'maroon' }}>
        Approved Events
      </Typography>
      <hr className={styles.horizontalRule} />

      <Grid container spacing={3} className={styles.eventGrid}>
        {approvedEvents.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event._id}>
            <Paper className={styles.eventCard}>
              <Box
                className={styles.eventHeader}
                style={{ backgroundImage: `url(${event.poster})` }}
              >
                <Typography variant="h6" className={styles.eventTitle}>
                  {event.title}
                </Typography>
              </Box>

              <Typography variant="body1" className={styles.eventDetails} paragraph>
                {event.details}
              </Typography>

              <Typography variant="body2" className={styles.eventDetails}>
                <strong>Total Tickets:</strong> {event.totalTickets}
              </Typography>
              <Typography variant="body2" className={styles.eventDetails}>
                <strong>Ticket Price:</strong> ₹{event.ticketPrice}
              </Typography>

              <Box className={styles.eventButtons}>
                <Button
                  variant="outlined"
                  color="warning" 
                  onClick={() => handleBlock(event._id)}
                >
                  Block
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ApproveEvent;