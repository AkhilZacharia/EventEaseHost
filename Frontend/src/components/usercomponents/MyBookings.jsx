import React, { useEffect, useState } from "react";
import axiosInstance from "../interceptor/axiosInterceptor";
import styles from "./MyBookings.module.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);
  const getSeat = () => Math.floor(Math.random() * 50) + 1; 
  const getRow = () => Math.floor(Math.random() * 10) + 1;


  useEffect(() => {
    axiosInstance.get("/user/bookings").then(async(res) => {  
       const Data =res.data;
      setBookings(Data.bookings );
      setEvents(res.data.events );
      console.log(bookings);
    }).catch((error) => {
      alert('Failed to fetch events');
    });
  }, []);

  useEffect(() => {
    console.log("Updated Bookings:", bookings);

    console.log("Updated event:", events);
  }, [bookings]);

  return (
    <div className={styles.ticketContainer}>
      {bookings.map((booking) => {
        const event = events.find((e) => e._id === booking.event_id);
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toDateString();
        return (
          <div key={booking._id} className={styles.ticket}>
            <div className={styles.ticketleft}>
              <h3 className={styles.eventName}>{event.title}</h3>
              <p className={styles.venue}>{event.location}</p>
              <p className={styles.dateTime}>{formattedDate} - {event.time}</p>
              <div className={styles.seatInfo}>
                <span>Row: {getSeat()}</span>
                <span>Seat: {getRow()}</span>
              </div>
              <div className={styles.ticketDetails}>
                <span>Tickets: {booking.tickets}</span>&nbsp;
                <span>Amount: {booking.amount}</span>
              </div>
            </div>
            <div className={styles.ticketright}>
              <h4 className={styles.ticketTitle}>Ticket</h4>
              <div className={styles.barcodePlaceholder}>
                <div className={styles.barcode}></div>
              </div>
              <p className={styles.ticketInfo}>Valid for entry</p>
            </div>
          </div>
          
        );
      })}
    </div>
  );
};

export default MyBookings;
