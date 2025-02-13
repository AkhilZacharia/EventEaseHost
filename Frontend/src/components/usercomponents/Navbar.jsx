import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import React, { useState } from 'react';

const Navbar = ({child}) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate=useNavigate();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  function Logout(){
    sessionStorage.removeItem('logintoken');
     navigate('/');
   }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">EventEase</a>
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={toggleNav} 
            aria-controls="navbarNav" 
            aria-expanded={isNavOpen ? "true" : "false"} 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
            <div className="formNav">
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/mybooking">Bookings</a>
              </li>
              
              <li className="nav-item">
                <a className="nav-link " onClick={Logout}>Log Out</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {child}
    </>
  );
};

export default Navbar;
