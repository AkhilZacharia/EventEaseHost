import React, { useState } from 'react';
import { FaMusic, FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';
import styles from './EventBook.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

const EventBook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.data;

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [numTickets, setNumTickets] = useState(1);

  const ticketPrice = message.ticketPrice;

  const handleTicketChange = (event) => {
    setNumTickets(event.target.value);
  };

  const calculateTotalPrice = () => {
    return numTickets * ticketPrice;
  };

  const goToPayment = () => {
    const detail = {
      amount: calculateTotalPrice(),
      tickets: numTickets,
      event_id: message._id,
      event: message.title,
    };
    console.log('home', detail);
    navigate('/payment', { state: detail });
  };

  const eventDate = new Date(message.date);
  const formattedDate = eventDate.toDateString();

  return (
    <div className={styles.eventPage}>
      {!showBookingForm ? (
        <>
          <div className={styles.content}>
            <div className={styles.imageContainer}>
              <img src={message.poster} alt="Event" />
            </div>

            <div className={styles.eventInfo}>
              <div className={styles.eventDetails}>
                <div className={styles.banner}>
                  <h3>{message.title}</h3>
                </div>
                <div className={styles.eventItem}>
                  <FaMusic className={styles.eventIcon} />
                  <span>{message.category}</span>
                </div>

                <div className={styles.eventItem}>
                  <FaCalendarAlt className={styles.eventIcon} />
                  <span>{formattedDate} | {message.time}</span>
                </div>

                <div className={styles.eventItem}>
                  <FaMapMarkerAlt className={styles.eventIcon} />
                  <span>{message.location}</span>
                </div>

                <hr />

                <div className={styles.ticketPrice}>
                  <span>From ₹ {message.ticketPrice} onwards</span>
                </div>

                <button className={styles.buyNow} onClick={() => setShowBookingForm(true)}>
                  BOOK NOW
                </button>
              </div>
            </div>
          </div>

          <div className={styles.eventDescription}>
            <h3>Event Details</h3>
            <p>{message.details}</p>
          </div>
        </>
      ) : (
        <div className={styles.bookingForm}>
          <h2>Booking Details</h2>

          <div className={styles.formGroup}>
            <label htmlFor="ticket-count">Number of Tickets:</label>
            <input
              type="number"
              id="ticket-count"
              value={numTickets}
              min="1"
              onChange={handleTicketChange}
            />
          </div>

          <div className={styles.formGroup}>
            <h3>Total Price: ₹{calculateTotalPrice()}</h3>
          </div>

          <button className={styles.backButton} onClick={() => setShowBookingForm(false)}>
            BACK
          </button>

          <button className={styles.confirmBooking} onClick={() => goToPayment()}>
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default EventBook;
