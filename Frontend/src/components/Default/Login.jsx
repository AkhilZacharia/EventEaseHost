import React, { useState} from 'react';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Grid2, Paper } from '@mui/material';
import styles from './Login.module.css';

const Login = () => {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [form, setForm] = useState({
    Email: '',
    Password: '',
  });
  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.Email)) {
      setEmailError('Please enter a valid email.');
      isValid = false;
    } else {
      setEmailError('');
    }
    const passwordRegex = /^(?=.*\d).{5,}$/;
    if (!passwordRegex.test(form.Password)) {
      setPasswordError('Password must be at least 5 characters long and contain at least one number.');
      isValid = false;
    } else {
      setPasswordError('');
    }
    return isValid;
  };

  const login = (e) => {
    e.preventDefault();
    if (validate()) {
      loginValue();
    }
  };

  const loginValue = () => {
    console.log(form);
    axios
      .post('http://localhost:3000/login/', form)
      .then((res) => {
        alert(res.data.message);
        if (res.data.key) {
          sessionStorage.setItem('logintoken', res.data.key);
          const decoded = jwtDecode(res.data.key);
          if (decoded.Role === 'Admin') {
            navigate('/approveuser');
          } else if (decoded.Role === 'Organizer') {
            navigate('/myevents');
          } else if (decoded.Role === 'User') {
            navigate('/home');
          }
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Invalid Login');
      });
  };

  return (
    <div className={styles.container}>
      <Typography variant="h2" component="h1" align="center" className={styles.welcomeMessage}>
        EventEase
      </Typography>

      <Paper elevation={6} className={styles.loginContainer}>
        <Grid2 container>
          <Grid2 item xs={12} md={6} className={styles.formSection}>
            <Box component="form" className={styles.form} onSubmit={login}>
              <Typography variant="h4" component="h1" gutterBottom className={styles.title}>
                Login
              </Typography>
              <TextField
                label="Email"
                name="Email"
                type="email"
                required
                fullWidth
                onChange={(e) => setForm({ ...form, Email: e.target.value })}
                className={styles.input}
              />
              <p className={styles.error}>{emailError}</p>
              <TextField
                label="Password"
                name="Password"
                type="password"
                required
                fullWidth
                onChange={(e) => setForm({ ...form, Password: e.target.value })}
                className={styles.input}
              />
              <p className={styles.error}>{passwordError}</p>
              <Button variant="contained" type="submit" className={styles.loginButton}>
                Login
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to="/register"
                className={styles.registerButton}
              >
                Register
              </Button>
            </Box>
          </Grid2>

          
          <Grid2 item xs={12} md={6} className={styles.imageSection}>
            <img
              src="/img/aud.jpg"
              alt="Event"
              className={styles.image}
            />
          </Grid2>
        </Grid2>
      </Paper>

      <footer className={styles.footer}>
        <Typography variant="body2" align="center">
          &copy; 2023 EventEase. All rights reserved.
        </Typography>
      </footer>
    </div>
  );
};


export default Login;
