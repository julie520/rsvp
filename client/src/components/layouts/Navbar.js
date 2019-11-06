import React, { useContext, Fragment } from 'react'
import {Link } from 'react-router-dom';
import AuthContext from '../../context/authContext/AuthContext';

const Navbar = () => {
  const { logout, clearError, userAuth, user } = useContext(AuthContext);
  const onLogout = () => {
    logout();
    clearError();
  }

  const userLinks = userAuth ? (
    <Fragment>
      <li>Hello, {user && user.name}</li>
      <span className="sm-hide">|</span>
      <li>
        <a href="#!" onClick={onLogout}>
          <span className="sm-hide">Logout</span>
          <i className="fas fa-sign-out-alt"></i>
        </a>
      </li>
    </Fragment>
  ) : (
    <Fragment>
      <li>
        <Link to="/register">
          <span className="sm-hide">Register</span>
        </Link>
      </li>
      <li>
        <Link to="/login">
          <span className="sm-hide">Login</span>
        </Link>
      </li>        
    </Fragment>
    )

  return (
    <div className="navbar">
      <div className="logo">
        <h1><i className='fas fa-glass-cheers' />
          Party RSVP
        </h1>
        <p>Made with <span>❤</span> by Mu Idrees</p>
      </div>
      <ul>
        {userLinks}
      </ul>
    </div>
  )
}

export default Navbar
