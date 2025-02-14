import React, { useState } from 'react';
import { TextField, MenuItem, Select, FormControl, InputLabel, Button, Box } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './Register.module.css'; 

const Register = () => {
  const[form,setForm]=useState({  
    Name: '',
    Email: '',
    Password: '',
    Role: 'User',
  });
  
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  
  const navigate=useNavigate();

  function registerValue(){
    console.log(form);
    axios.post('https://eventeasehost-back.onrender.com/login/add/',form).then((res)=>{
     alert(res.data.message);
        navigate('/');
    }).catch((error)=>{
     alert('Failed');
    })
  }
 
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.registerContainer}>
      <Box container spacing={2} justifyContent="center">
      <Box item xs={12} sm={6} md={6} className={styles.description}>
          <h3>Welcome to Our Platform</h3>
          <p>Join us today to enjoy a seamless experience for event booking and enjoying the awesome experience.</p>
          <span>Already have an account ? </span>
          <Button
                variant="outlined"
                component={Link}
                to="/"
                className={styles.registerButton}
              >
                Login
              </Button>
        </Box>
        <Box item xs={12} sm={6} md={6} className={styles.formBox}>
          <h2>Create an Account</h2>
            <TextField
              fullWidth
              name="Name"
              value={form.Name}
              onChange={handleChange}
              label="Name"
              variant="outlined"
              margin="normal"
              error={Boolean(errors.name)}
              helperText={errors.name}
            />

            <TextField
              fullWidth
              name="Email"
              value={form.Email}
              onChange={handleChange}
              label="Email"
              variant="outlined"
              margin="normal"
              error={Boolean(errors.email)}
              helperText={errors.email}
            />

            <TextField
              fullWidth
              name="Password"
              value={form.Password}
              onChange={handleChange}
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              error={Boolean(errors.password)}
              helperText={errors.password}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                name="Role"
                value={form.Role}
                onChange={handleChange}
                label="Role"
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Organizer">Organizer</MenuItem>
              </Select>
            </FormControl>

            <Button onClick={registerValue} variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
        </Box>

        
      </Box>
    </div>
  );
};

export default Register;
