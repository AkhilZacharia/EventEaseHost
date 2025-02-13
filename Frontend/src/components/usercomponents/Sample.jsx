import React from "react";
import "../css/Sample.css";
import { useNavigate } from 'react-router-dom';


const events = [
  {
    name: "Rock Concert",
    totalTickets: 200,
    remainingTickets: 50,
    date: "2025-02-20",
    imageUrl: "/img/7427979.jpg",
  },
  {
    name: "Theater Play",
    totalTickets: 150,
    remainingTickets: 120,
    date: "2025-03-10",
    imageUrl: "/img/10292893.jpg",
  },
  {
    name: "Art Exhibition",
    totalTickets: 100,
    remainingTickets: 30,
    date: "2025-04-05",
    imageUrl: "/img/5457716.jpg",
  },
];

const EventPage = () => {
  const navigate = useNavigate();

  function Logout(){
    sessionStorage.removeItem('logintoken');
     navigate('/');
   }
  return (
    <div>
  

      <div className="event-container">
        <h2 className="event-title">Upcoming Events</h2>
        <div className="event-banners">
          {events.map((event, index) => (
            <div key={index} className="event-banner">
              <img src={event.imageUrl} alt={event.name} className="event-banner-img" />
              <div className="event-banner-info">
                <h3>{event.name}</h3>
                <p>Date: {event.date}</p>
                <p>Total Tickets: {event.totalTickets}</p>
                <p>Remaining Tickets: {event.remainingTickets}</p>
                <button className="book-btn">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPage;


