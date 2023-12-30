import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./header.css"


const Header = () =>{
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className='navbar'>
      <div className='gradient'></div>
        <div className='links'>
          <Link to="/" className={currentPath == "/" ? "active" : ""}>SignUp</Link>
          <Link to="/podcasts" className={currentPath == "/podcasts" ? "active" : ""}>Podcasts</Link>
          <Link to="/create_a_podcast" className={currentPath == "/create_a_podcast" ? "active" : ""}>Start A Podcast</Link>
          <Link to="/profile" className={currentPath == "/profile" ? "active" : ""}>Profile</Link>
        </div>
    </div>
  )
}

export default Header;