import React, { useState, useEffect } from 'react';
import axiosInstance from '../interceptor/axiosInterceptor';
import { useNavigate } from 'react-router-dom';
import { Carousel, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
  
    useEffect(() => {
      axiosInstance.get('/home/').then((res) => {  
        console.log(res.data);
        setEvents(res.data); 
      }).catch((error) => {
        alert('Failed to fetch events');
      });
    }, []);
  
    const book = (eventId) => {
      const event = events.find((event) => event._id === eventId);
      navigate('/det', {state: { data:event }});
    };

   

    return (
      <div style={{ padding: '20px', background: `url('/img/golden-frame-blue-background.jpg') no-repeat center center/cover` }}>
        
       
        <Carousel 
          className="carousel-container" 
          controls={true} 
          indicators={false} 
          interval={1000} 
          pause="hover"
          style={{ height: '50vh', position: 'relative', width: '100%' }}
          
        >
          {events.map((event, index) => (
            <Carousel.Item key={index} style={{ height: '50vh' }}>
              <img className="d-block w-100" src={event.poster} alt={`Slide ${index + 1}`} style={{ objectFit: 'cover', height: '100%' }} />
              <Carousel.Caption>
                <h3>{event.title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        <div style={{ marginTop: '20px' }}>
          <h2 style={{ color: 'white', textAlign:'center' }}>Upcoming Events</h2>
          {events.map((event) => {
            const date = new Date(event.date);
            const formattedDate = date.toDateString();

            return (
              <div 
                key={event._id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  padding: '20px',
                  height: '36vh',
                  width: '80%',
                  margin: '30px auto', 
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease-in-out',
                  borderRadius: '30px',
                  backgroundImage: event.poster ? `url(${event.poster})` : 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)' 
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
              >
                <div 
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    padding: '20px',
                    color: 'white',
                    borderRadius: '5px'
                  }}
                >
                  <h4>{event.title}</h4>
                  <p>Date: {formattedDate}</p>
                  <p>Total Tickets: {event.totalTickets}</p>
                  <p>Location: {event.location}</p>
                  <Button variant="primary" onClick={() => book(event._id)}>View Details</Button>
                </div>
              </div>
            );
          })}
        </div>

        <footer style={{
          backgroundColor: '#333', color: 'white', padding: '20px 0', textAlign: 'center', marginTop: '50px'
        }}>
          <p>© 2025 Event Ease. All Rights Reserved.</p>
        </footer>
      </div>
    );
}

export default AdminDashboard