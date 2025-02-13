import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid2, Box, Input, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../interceptor/axiosInterceptor';
import axios from 'axios';
import styles from './Addevnt.module.css';

const EventForm = () => {
  const [form, setForm] = useState({
    title: '',
    date: '',
    category: '',
    time: '',
    duration: '',
    details: '',
    location: '',
    totalTickets: '',
    ticketPrice: '',
    poster: ''
  });
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  const fileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'ticketPrice') {
      if (value < 50) {
        setError('Ticket price must be at least 50');
      } else {
        setError('');
      }
    }
  };

  const upload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "EventEase");
    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dhbu40pkf/image/upload", formData);
      return response.data.secure_url;
    } catch (error) {
      console.error("Upload Error:", error);
    }
  };

  const addevent = async (e) => {
    e.preventDefault();
    if (form.ticketPrice < 50) {
      setError("Ticket price must be at least 50");
      return;
    }
    try {
      const imgUrl = await upload(file);
      const updatedForm = { ...form, poster: imgUrl };
      await axiosInstance.post('/org/addevent/', updatedForm);
      alert('Event added successfully');
      navigate('/myevents');
    } catch (error) {
      alert('Failed to add event');
      console.error(error);
    }
  };

  return (
    <Box className={styles.eventContainer}>
      <Typography variant="h4" className={styles.eventTitle}>Add Event</Typography>
      <Box className={styles.eventFormWrapper}>
        <Grid2 container spacing={2}>
          <Grid2 item xs={12} sm={6} className={styles.inputField}>
            <TextField label="Event Title" name="title" onChange={handleChange} fullWidth required/>
          </Grid2>
          <Grid2 item xs={12} sm={6} className={styles.inputField}>
            <TextField label="Category" name="category" onChange={handleChange} fullWidth required/>
          </Grid2>
          <Grid2 item xs={12} sm={6} className={styles.inputField}>
            <TextField label="Date" type="date" InputLabelProps={{ shrink: true }} name="date" onChange={handleChange} fullWidth required />
          </Grid2>
          <Grid2 item xs={12} sm={6} className={styles.inputField}>
            <TextField label="Time" type="time" inputProps={{ step: 300 }} InputLabelProps={{ shrink: true }} name="time" onChange={handleChange} fullWidth required />
          </Grid2>
          <Grid2 item xs={12} sm={6} className={styles.inputField}>
            <TextField label="Duration" name="duration" placeholder="2hr" onChange={handleChange} fullWidth required/>
          </Grid2>
          <Grid2 item xs={12} sm={6} className={styles.inputField}>
            <TextField label="Location" name="location" onChange={handleChange} fullWidth required/>
          </Grid2>
          <Grid2 item xs={12} sm={6} className={styles.inputField}>
            <TextField label="Total Tickets" type="number" name="totalTickets" onChange={handleChange} fullWidth required/>
          </Grid2>
          <Grid2 item xs={12} sm={6} className={styles.inputField}>
            <TextField label="Ticket Price" type="number" name="ticketPrice" onChange={handleChange} fullWidth required/>
            {error && <Typography className={styles.error}>{error}</Typography>}
          </Grid2>
          <Grid2 item xs={12} className={styles.uploadField}>
            <Typography variant="body1">Upload Event Poster</Typography>
            <Input type="file" name="poster" onChange={fileChange} required/>
            {imagePreview && <img src={imagePreview} alt="Preview" className={styles.imagePreview} />}
          </Grid2>
          <Grid2 item xs={12} className={styles.inputField}>
            <TextField label="Details" multiline rows={4} name="details" onChange={handleChange} fullWidth required/>
          </Grid2>
          <Grid2 item xs={12} className={styles.submitButtonWrapper}>
            
          </Grid2>
        </Grid2>
        <Button variant="contained" color="primary" fullWidth onClick={addevent} >
              Submit Event
            </Button>
      </Box>
      
    </Box>
  );
};

export default EventForm;
