import React, { useState } from 'react';
import { FaMusic, FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';
import styles from '../usercomponents/EventBook.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Details = () => {
  const location = useLocation();
  const message = location.state?.data;
  if (!message) {
    return <div className={styles.errorMessage}>Event details not found!</div>;
  }
  const eventDate = new Date(message.date);
  const formattedDate = eventDate.toDateString();

  return (
    <div className={styles.eventPage}>
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
              </div>
            </div>
          </div>

          <div className={styles.eventDescription}>
            <h3>Event Details</h3>
            <p>{message.details}</p>
          </div>
    </div>
  );
};

export default Details