import React from "react";
import {NavLink} from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
      <h3>Vidly</h3>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <NavLink className="nav-item nav-link" to="/movies">Movie</NavLink>
      <NavLink className="nav-item nav-link" to="/customers">Customers</NavLink>
      <NavLink className="nav-item nav-link" to="/rentals">Rentals</NavLink>
      <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
      <NavLink className="nav-item nav-link" to="/register">Register</NavLink>

      
    </ul>
  </div>
    </nav>
  );
};

export default NavBar;
